#
# http_server.py - test for espidf based MP http server
#

import espidf as esp
import uos, ujson, uheapq
import lvgl as lv

class http_server:
    def __init__(self):
        print("http_server: init");
        
        self.server = esp.http_server_t()
        self.server.start()
        self.ws_pkt = None
        self.queue = []

        # set / redirect
        self.root_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/", "method": esp.http_server.GET } })
        self.server.register(self.root_handler, self.root_get_callback, None)

        # websocket handler used for the liveview
        self.ws_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/ws", "method": esp.http_server.GET, "is_websocket": True } })
        self.server.register(self.ws_handler, self.ws_get_callback, None)

        # upload post handler, used to upload files to the esp32
        self.upload_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/upload/*", "method": esp.http_server.POST } })
        self.server.register(self.upload_handler, self.upload_post_callback, None)

        # command post handler, used to send commands to esp32
        self.cmd_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/cmd", "method": esp.http_server.POST } })
        self.server.register(self.cmd_handler, self.cmd_post_callback, None)

        # files handler, used to read files and directory listings from fs
        self.files_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/files/*", "method": esp.http_server.GET } })
        self.server.register(self.files_handler, self.files_get_callback, None)

        # html server, serving html pages and other content from /html
        self.html_handler = esp.http_server_handler_t(
            { "httpd_uri": { "uri": "/*", "method": esp.http_server.GET } })
        self.server.register(self.html_handler, self.html_get_callback, None)

    def get_header_value(self,req, name):
        blen = req.get_hdr_value_len(name);
        if not blen: return None
        data = bytearray(blen+1);
        req.get_hdr_value_str(name, data, blen+1);
        # string is \0 terminated, decode without \0
        return data[:-1].decode("utf-8")

    def dump_hdr_info(self,req):
        for i in [ "Content-Type", "Accept", "Content-Length" ]:
            print(i, self.get_header_value(req, i));

    def get_boundary(self, req):
        ctype = self.get_header_value(req, "Content-Type")
        if not ctype: return None
        for ct in ctype.split(';'):
            ctp = ct.split('=')
            if len(ctp) == 2:
                if ctp[0].lower().strip() == "boundary":
                    return ctp[1].strip()
        return None

    def get_filename(self, line):
        cparts = line.split(":", 1)
        if len(cparts) == 2:        
            dparts = cparts[1].split(';')
            for dpart in dparts:
                dp = dpart.split("=", 1)
                if len(dp) == 2 and dp[0].strip() == "filename":
                    return dp[1].strip("\" ");
        return None

    def input_callback(self, drv, data):
        data.state = lv.INDEV_STATE.REL
        if self.mstate and self.mstate["b"]:
            data.state = lv.INDEV_STATE.PR
            data.point.x = self.mstate["x"];
            data.point.y = self.mstate["y"];
        return False
    
    def register_input_callback(self):
        # setup input driver to send click events
        self.drv = lv.indev_drv_t()
        self.drv.init()
        self.drv.type = lv.INDEV_TYPE.POINTER
        self.drv.read_cb = self.input_callback
        self.drv.register()
        self.mstate = None

    def screen_flush(self, drv, area, buf):
        # print("Area:", area.x1, area.x2, area.y1, area.y2);
        # convert area struct into bytes
        area_bytes = area.x1.to_bytes(2, 'big') + area.x2.to_bytes(2, 'big') + area.y1.to_bytes(2, 'big') + area.y2.to_bytes(2, 'big')
        data = buf.__dereference__(area.get_size() * lv.color_t.SIZE)
        try:
            self.ws_pkt.payload = area_bytes + data
            self.ws_pkt.len = len(area_bytes + data)
            self.ws_pkt.type = 2  # HTTPD_WS_TYPE_BINARY 
            self.ws_pkt.final = False
            self.ws_pkt.fragmented = False
            # ret = self.req.ws_send_frame(self.ws_pkt)
            
            # todo: setup four ws_pkt's
            esp.ws_schedule_frame(self.handler, self.ws_pkt)
            # print("SEND:", self.ws_pkt.len, ret);
            
            # send(client_socket, area_bytes + data);
        except Exception as e:
            print("Error:", e);
            
        esp.ili9xxx_flush(drv, area, buf)

    def get_screen(self):    
        lv.scr_act().get_disp().driver.flush_cb = self.screen_flush;
        lv.scr_act().invalidate()
        lv.refr_now(lv.disp_get_default())        
        lv.scr_act().get_disp().driver.flush_cb = esp.ili9xxx_flush
        self.req = None
        self.handler = None
            
    def ws_get_callback(self, handler, req):
        # read command        
        buf = bytearray(128);
        ws_pkt = esp.httpd_ws_frame_t();
        ws_pkt.payload = buf
        ws_pkt.final = False
        ws_pkt.fragmented = False
        ws_pkt.type = 1  # HTTPD_WS_TYPE_TEXT
        ret = req.ws_recv_frame(ws_pkt, 128);
        # print("WS RECV:", ret, ws_pkt.len, ws_pkt.final)
        try:
            msg = buf[:ws_pkt.len].decode("utf-8");
        except Exception as e:
            print("Exception while decoding message:", e)
            return -1  # ESP_FAIL           

        # print("MSG:", msg);
        if msg == "screen":
            # print("sending screen");

            # prepare for sending screen
            self.req = req
            self.handler = handler
            if not self.ws_pkt:
                self.ws_pkt = esp.httpd_ws_frame_t();
        
            self.get_screen()
        elif msg.split(":")[0] == "mouse":
            state = msg.split(":")[1].split(",")
            if len(state) == 3:
                # TODO: catch conversion problems
                self.mstate = { "x": int(state[0]), "y": int(state[1]), "b": int(state[2]) }
            else:
                print("Mlen", msg);
        else:
            print("Unknown command:", msg);

        return 0

    def send_error(self, req, code, msg):
        req.resp_set_status(str(code)+" "+msg);
        req.resp_sendstr(msg)

    def copyfile(self, source, dest):
        with open(source, 'rb') as src, open(dest, 'wb') as dst:
            while True:
                buffer = src.read(1024)
                if not buffer: break
                dst.write(buffer)
            src.close()
            dst.close()
   
    def cmd_post_callback(self, handler, req):
        # try to fetch body
        try:
            buffer = bytearray(req.content_len);
            req.recv(buffer, len(buffer))
            parsed = ujson.loads(buffer);
            
        except Exception as e:
            print("Exception while reading post data:", e);
            self.send_error(req, 400, e)
            return -1  # ESP_FAIL

        print("Parsed:", parsed);

        if not "cmd" in parsed:
            self.send_error(req, 400, "Missing command")
            return -1  # ESP_FAIL

        # check for project files
        pfiles = [ ]
        if "project" in parsed:
            # get projects base name (prepent / if missing
            prjbase = self.unquote(parsed["project"])
            if not prjbase[0] == "/": prjbase = "/" + prjbase
            for i in [ ".py", ".xml" ]:
                fname = prjbase+i
                print("Checking for", fname);
                try:
                    if uos.stat(fname)[0] & 0x8000:
                        pfiles.append(prjbase+i)
                except:
                    pass
                
            print("Files:", pfiles)

            if not len(pfiles):
                req.resp_set_status("404 Project not found");
                req.resp_sendstr("Project not found");
                return -1  # ESP_FAIL            
            
        if parsed["cmd"] == "delete":
            print("Delete command");
            try:
                for i in pfiles:
                    uos.remove(i)
            except Exception as e:
                self.send_error(req, 400, "Delete failed " + e);
                return -1  # ESP_FAIL                            
            
        elif parsed["cmd"] == "copy":
            print("Copy command");
            try:
                for i in pfiles:
                    # copy from /sd/xyz to /xyz or from
                    # /xyz to /sd/xyz
                    if i.startswith("/sd"): dstname = i[3:]
                    else:                   dstname = "/sd"+i
                    print("copy", i, "to", dstname);
                    self.copyfile(i, dstname)
            except Exception as e:
                self.send_error(req, 400, "Copy failed "+e);
                return -1  # ESP_FAIL                            
            
        elif parsed["cmd"] == "rename":
            print("Rename command");

            # rename needs a "new" entry
            if not "new" in parsed:
                self.send_error(req, 400, "New name not specified");
                return -1  # ESP_FAIL            

            newbase = self.unquote(parsed["new"])
            if not newbase[0] == "/": newbase = "/" + newbase
            try:
                for i in pfiles:
                    newname = newbase + "." + i.split(".")[-1]
                    print("rename", i, "to", newname);
                    uos.rename(i, newname)
            except Exception as e:
                print("Error", e);
                self.send_error(req, 400, "Rename failed "+e);
                return -1  # ESP_FAIL
            
        elif parsed["cmd"] == "run":
            if not "name" in parsed or not "sd" in parsed:                
                self.send_error(req, 400, "Incomplete run request");
                return -1  # ESP_FAIL
            
            # push command into queue to be read by lvgl task
            uheapq.heappush(self.queue, ( "run", parsed["sd"], parsed["name"]));
            
        else:
            self.send_error(req, 400, "Unknown command " + parsed["cmd"]);
            return -1  # ESP_FAIL
            
        req.resp_sendstr("Command ok")
        return 0 

    def get_command(self):
        if len(self.queue):
            return uheapq.heappop(self.queue)

        return None
    
    def upload_post_callback(self, handler, req):

        boundary = self.get_boundary(req);
        if not boundary:
            req.resp_set_status("400 Boundary not found");
            req.resp_sendstr("")
            return -1  # ESP_FAIL           
        
        # try to fetch body
        try:
            buffer = bytearray(req.content_len);
            req.recv(buffer, len(buffer))
            lines = buffer.decode("utf-8").splitlines();
        except Exception as e:
            print("Exception while reading post data:", e);
            req.resp_set_status("400 Parse error");
            req.resp_sendstr("")
            return -1  # ESP_FAIL           
                
        # parse all lines
        f = None
        state = 0  # idle
        for line in lines:
            if line.startswith("--"+boundary):
                if f:
                    f.close()
                    f = None
                state = 1 # header parsing
            elif state == 1:
                if not len(line):
                    # found end of header
                    state = 2
                elif line.split(":")[0].strip() == "Content-Disposition":
                    filename = self.get_filename(line)
                    if filename:
                        print("Writing file", filename)
                        try:
                            f = open(filename, "wb")
                            first_line = True
                        except Exception as e:
                            print("Exception while opening file:", e);
                            req.resp_set_status("500 Unable to open file for writing");
                            req.resp_sendstr(e)
                            return -1  # ESP_FAIL           
            elif state == 2:
                if f:
                    if first_line: first_line = False
                    else:          f.write("\n")
                    f.write(line)

        req.resp_sendstr("<h1>POST!</h1>");
        return 0

    def root_get_callback(self, handler, req):
        # redirect incoming GET request to /index.html
        req.resp_set_status("307 Temporary Redirect");
        req.resp_set_hdr("Location", "/index.html");
        req.resp_send(None, 0);
        return 0;
    
    def get_mimetype(self,name):
        CONTENT_TYPES = {
            "html": "text/html",
            "css": "text/css",
            "mp3": "audio/mpeg",
            "wav": "audio/wav",
            "ogg": "audio/ogg",
            "json": "application/json",
            "svg": "image/svg+xml",
            "png": "image/png",
            "jpg": "image/jpeg",
            "svg": "image/svg+xml",
            "xml": "application/xml",
            "py": "text/x-python",
            "js": "application/javascript",
            "ico": "image/x-icon"
        }
        
        ext = name.split('.')[-1]    
        if ext in CONTENT_TYPES:
            return CONTENT_TYPES[ext]
        
        return "application/octet-stream"

    def check4file(self, fname):
        try:
            f = open(fname, "r")
            f.close()
            return True
        except:
            return False

    def unquote(self, string):
        parts = string.split('%')
        result = parts[0]
        if len(parts) > 1:
            for part in parts[1:]:
                try:
                    result += chr(int(part[:2], 16)) + part[2:]
                except:
                    result += "%"+part

        return result

    def files_get_callback(self, handler, req):
        path = self.unquote("/"+(req.get_uri().split("/", 2)[2]))
        print("Files:", path)

        if path[-1] == '/':
            # if requested path ends with "/" then a directory
            # listing will be sent as json
            try:
                files = uos.ilistdir(path[:-1])
            except:
                req.resp_set_status("404 Directory Not Found");
                req.resp_sendstr("")
                return -1  # ESP_FAIL           

            # send directory listing as json
            req.resp_set_type("application/json")
            req.resp_sendstr(ujson.dumps(list(files)))
        else:
            try:
                f = open(path, "rb")    
                data = f.read()
                f.close();
                # and set mime type
                req.resp_set_type(self.get_mimetype(path));

            except Exception as e:
                print("Exception during file access:", e);
                req.resp_set_status("404 File Not Found");
                req.resp_sendstr("<h1>File error: " + str(e) + "</h1>");
                return -1  # ESP_FAIL
        
            req.resp_send(data, len(data));
                
        return 0
    
    def html_get_callback(self, handler, req):
        name = "/html"+req.get_uri().split('?')[0];
        print("sending file:", name);

        try:
            if self.check4file(name+".gz"):
                f = open(name+".gz", "rb")    
                data = f.read()
                f.close();
                req.resp_set_hdr("Content-Encoding", "gzip"); 
            else:            
                f = open(name, "rb")    
                data = f.read()
                f.close();
                
            # and set mime type
            req.resp_set_type(self.get_mimetype(name));

        except Exception as e:
            print("Exception during file access:", e);
            req.resp_set_status("404 File Not Found");
            req.resp_sendstr("<h1>File error: " + str(e) + "</h1>");
            return -1  # ESP_FAIL

        # httpd will set content length itself ...
        req.resp_send(data, len(data));

        return 0

    def stop(self):
        print("Stopping server");
        self.server.stop()
