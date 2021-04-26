#
# apps.py
#
# Application "launcher"
#

import sys, machine, uos
from uio import IOBase 
import _thread

import gui
import lvgl as lv

class Page_Apps:
    def exception_str(e):
        from uio import StringIO
        s=StringIO(); sys.print_exception(e, s)  
        s=s.getvalue().split('\n');
        l = len(s)
        line = s[l-3].split(',')[1].strip();
        error = s[l-2].strip();

        return "Error in "+line+"\n"+error;
        

    class Console(lv.label):
        class Wrapper(IOBase):
            def __init__(self):
                self.buffer = ""

            def write(self, data):
                self.buffer += data.decode('ascii').replace('\r', '')
            
            def get_buffer(self):
                retval = self.buffer
                self.buffer = ""        
                return retval
        
        def watcher(self, data):
            d = self.wrapper.get_buffer()
            if d != "": self.ins_text(lv.LABEL_POS.LAST, d);
        
            if not self.running:
                try:    uos.dupterm(None)
                except: pass
                self.task.set_repeat_count(0);
                if self.done_cb:
                    self.done_cb()

        def execute(self, code):
            # try to replace all print calls by our own function ...
            
            
            try:
                exec(code, {} )
            except Exception as e:
                print(Page_Apps.exception_str(e))
            
            self.running = False
        
        def __init__(self, *args, **kwds):
            super().__init__(*args, **kwds)
            self.set_text("")
            self.set_long_mode(lv.label.LONG.BREAK);

        def run(self, code, done_cb = None):
            self.done_cb = done_cb
        
            # start wrapper to catch script output
            self.wrapper = self.Wrapper()
            try:
                uos.dupterm(self.wrapper)
            except:
                print("No dupterm");

            # run script in background
            self.running = True
            _thread.start_new_thread( self.execute, ( code, ) )
            
            # start task to read text from wrapper and display it in label
            self.task = lv.task_create(self.watcher, 100, lv.TASK_PRIO.MID, None);

    def on_reload_btn(self, obj, event):
        if event == lv.EVENT.CLICKED:
            self.reload();
        
    def reload(self):
        self.list.clean()

        dir = "apps"
        symbol = lv.SYMBOL.FILE
        if hasattr(machine, "SDCard") and self.button.is_checked() :
            dir = "/sd/apps"
            symbol = lv.SYMBOL.SD_CARD
        
        # scan controller flash for apps
        try:
            i = uos.ilistdir(dir)                        
            for f in i:
                if f[0].endswith(".py"):
                    list_btn = self.list.add_btn(symbol, f[0]);
                    list_btn.set_event_cb(self.on_app_btn);
        except:
            print("file system access failed!");
            
    def event_handler(self,obj,evt):
        if  evt == lv.EVENT.VALUE_CHANGED:
            self.reload()

    def exec_cmd(self, cmd):
        if cmd[0] == "run":
            print("Run:", cmd[1], cmd[2]);
            self.execute(cmd[1], cmd[2])
        else:
            print("Unknown command:", cmd);
            
    def http_server_poll(self, data):
        cmd = self.screen.http_server_poll()
        if cmd: self.exec_cmd(cmd)
        #if self.fake_cmd:
        #    self.exec_cmd(self.fake_cmd)
        #    self.fake_cmd = None

    #def fake(self, x):
    #    self.fake_cmd = ("run", False, "hello");
    #    self.fake_task.set_repeat_count(0);
                    
    def __init__(self, page, screen):
        self.page = page
        self.screen = screen
        self.win = None

        # for fake run
        #self.fake_cmd = None
        #self.fake_task = lv.task_create(self.fake, 5000, lv.TASK_PRIO.MID, None);
        
        # create a task to check for commands from http_server
        self.http_task = lv.task_create(self.http_server_poll, 100, lv.TASK_PRIO.MID, None);
        
        # create a checkbox
        self.button = lv.checkbox(page);
        self.button.set_text("SD Card");
        self.button.align(page, lv.ALIGN.IN_TOP_LEFT, 16, 10)
        self.button.set_event_cb(self.event_handler)            

        if not hasattr(machine, "SDCard"):
            self.button.set_disabled()

        # reload button
        self.reload_btn = lv.btn(page)
        self.reload_btn.set_size(32, 32);
        self.reload_btn.align(page, lv.ALIGN.IN_TOP_RIGHT, -12, 4)
        self.reload_btn.set_event_cb(self.on_reload_btn)
        lv.label(self.reload_btn).set_text(lv.SYMBOL.REFRESH)
        
        # List of Apps
        self.list = lv.list(page)
        self.list.set_size(216, 216);
        self.list.align(page, lv.ALIGN.IN_TOP_MID, 0, 38)

        self.reload()

    def check_for_page_class(self, code):
        # scan over all lines
        for line in code.splitlines():
            if line.startswith("class "):
                if "Page" in line:
                    return True
            
        return False
    
    def check_for_llvgl_import(self, code):
        # scan over all lines
        for line in code.splitlines():
            line = line.strip()
            if line.startswith("import ") or line.startswith("from "):
                if "llvgl" in line:
                    return True
                
        return False            

    def run_in_console(self, name, code):
        def done_cb():
            self.close_btn.set_state(lv.STATE.DEFAULT);
            self.close_btn.invalidate()
        
        console = self.Console(self.win)
        console.set_width(210);
        # we cannot stop threads, so disable the close
        # button while thread runs
        self.close_btn.set_state(lv.STATE.DISABLED);
        console.run(code, done_cb)

    def run_with_llvgl(self, name):
        def load_failed(e):
            gui.DialogBox(Page_Apps.exception_str(e), lv.scr_act())
                
        print("Running with llvgl", name)

        # make window available to all llvgl instances
        import llvgl
        sys.modules['llvgl'].config = { "win": self.win, "close_btn": self.close_btn, "objects": [ ] }
        
        try:
            exec('import apps.' + name, {} )
        except Exception as e:
            load_failed(e)
            return
        
        return
        
    def run_with_own_page(self, name):        
        def load_failed(e):
            gui.DialogBox(Page_Apps.exception_str(e), lv.scr_act())
            if "apps."+name in sys.modules:
                del sys.modules["apps."+name]        
        try:
            exec('import apps.' + name, {} )
        except Exception as e:
            load_failed(e)
            return
        
        # try to set the title from the title function in the Page class
        try:
            self.win.set_title(sys.modules["apps."+name].Page.title())
        except:
            pass
        
        try:
            self.app_page = sys.modules["apps."+name].Page(self.win.get_content())
        except Exception as e:
            load_failed(e)

    def on_app_btn(self, obj, event):
        if event == lv.EVENT.CLICKED:
            name = lv.list.__cast__(obj).get_btn_text()[:-3]
            # "is_checked" return true for an unchecked but disabled
            # button. This is catched inside execute when no SD card
            # is available at all
            self.execute(self.button.is_checked(), name);

    def execute(self, is_sd, name):
        def on_close(obj, evt):
            lv.win.close_event_cb(lv.win.__cast__(obj), evt)                
            if evt == lv.EVENT.CLICKED:
                if 'llvgl' in sys.modules:
                    sys.modules['llvgl'].close();
                    del sys.modules['llvgl']
                    
                if self.app_page:
                    if hasattr(self.app_page, "close"):
                        self.app_page.close()
                    del self.app_page
                    self.app_page = None
                
                # may not be there anymore if page creation failed
                if "apps."+name in sys.modules:
                    del sys.modules["apps."+name]
            self.win = None

        # check of there is already an open app
        if self.win:
            if self.close_btn.get_state(0) & lv.STATE.DISABLED:
                # we cannot close the window if the thread is still
                # running. And we cannot stop threads ... so we don't
                # do anything and hope for the thread to end sometime ...
                return
            else:
                # send released event to the close button so this in turn
                # closes the windows which is currently open
                self.close_btn.set_event_cb(None)            # prevent buttons own events
                on_close(self.close_btn, lv.EVENT.PRESSED);
                on_close(self.close_btn, lv.EVENT.CLICKED);  # needed to call close()
                on_close(self.close_btn, lv.EVENT.RELEASED);

        # assume app has no own page
        self.app_page = None
        
        # if the machine has an sd card, then change
        # into the appropriate dir
        if hasattr(machine, "SDCard") and is_sd:
            uos.chdir("/sd")

        # load code
        try:
            f = open("apps/"+name+".py")
            code = f.read()
            f.close()
        except Exception as e:
            code = None
            # TODO: handle load error
            print("Load error:", e)
            return

        if code:
            # create window to run the app in
            self.win = lv.win(lv.scr_act())

            self.win.set_title(name)
            
            # add close button to the header
            self.close_btn = self.win.add_btn_right(lv.SYMBOL.CLOSE)
            self.close_btn.set_event_cb(on_close)
                
            # try to figure out if this a simple script or
            # if it implements its own lvgl ui
            if self.check_for_page_class(code):
                self.run_with_own_page(name)
            elif self.check_for_llvgl_import(code):
                self.run_with_llvgl(name)
            else:
                self.run_in_console(name, code)

        # return to default path
        if hasattr(machine, "SDCard"):
            uos.chdir("/")

