#
# mqtt.py - very simple mqtt implementation for the ftduino32
#

import socket
from ubinascii import hexlify
from machine import unique_id
import ustruct as struct

# a very simple mqtt class
class mqtt_lite:
    def __init__(self):
        self.state = -1
        self.clean = True
        self.client_id = hexlify(unique_id())
        self.pid = 1   # current packet id
        self.sub = { "init": {}, "active": {} }
        self.socket = None
        self.rx_buffer = bytearray()

    def is_connected(self):
        return self.socket != None
        
    def connect(self, ip, login = None, keepalive = None, lw = None):
        try:
            addr = socket.getaddrinfo(ip, 1883)[0][-1]
            self.socket = socket.socket()
            self.socket.connect(addr)
            self.socket.setsockopt(socket.SOL_SOCKET, 20, self.rx)
        except:
            self.socket = None
            return False

        self.state = 0
        
        premsg = bytearray(b"\x10\0\0\0\0\0")
        msg = bytearray(b"\x04MQTT\x04\0\0\0")  # Protocol 3.1.1

        # make sure login has two members (name and password)
        if login != None and len(login) != 2:
            login = None
            
        # and last will has four parts (topic, message, qos and retain)
        if login != None and len(login) != 2:
            login = None
        
        sz = 10 + 2 + len(self.client_id)
        msg[6] = self.clean << 1
        if login:
            sz += 2 + len(login[0]) + 2 + len(login[1])
            msg[6] |= 0xC0
        if keepalive:
            msg[7] |= self.keepalive >> 8
            msg[8] |= self.keepalive & 0x00FF
        if lw:
            sz += 2 + len(lw[0]) + 2 + len(lw[1])
            msg[6] |= 0x4 | (lw[2] & 0x1) << 3 | (lw[2] & 0x2) << 3
            msg[6] |= lw[3] << 5

        i = 1
        while sz > 0x7f:
            premsg[i] = (sz & 0x7f) | 0x80
            sz >>= 7
            i += 1
        premsg[i] = sz
        
        # send connect message
        self.socket.write(premsg, i + 2)
        self.socket.write(msg)
        self.send_str(self.client_id)
        if lw:
            self.send_str(lw[0])
            self.send_str(lw[1])
        if login:
            self.send_str(login[0])
            self.send_str(login[1])
            
        return True

    def disconnect(self, bye = True):
        if self.socket:
            self.subs = { }   # clear all subscriptions
            self.subpid = { }
            if bye:
                self.socket.write(b"\xe0\0")
            self.socket.close()
            self.socket = None

    def check4pkt(self, data):
        if not len(data): return False
        i = 1
        l = 0 # try to parse length
        while i < len(data) and data[i] & 0x80:
            l += (data[i] & 0x7f)<<((i-1)*7)
            i = i + 1
        if data[i] & 0x80: return False  # incomplete length
        l += data[i]<<((i-1)*7)
        if l+i+1 > len(data): return False  # incomplete payload
        return i+1, l  # return header and payload length
        
    def parse_pkt(self, op, data):        
        if self.state == 0:   # exp CONNACK
            if len(data) != 2 or op != 0x20 or data[1] != 0:  # CONACK has 2 bytes payload
                self.disconnect(False)
                self.state = -1
            else:
                self.state = 1
                
        elif self.state == 1:
            if op == 0xd0:   # PINGRESP
                return

            elif op == 0x40: # PUBACK
                return

            elif op == 0x90: # SUBACK
                if data[2] == 0x80:
                    return
                    
                pid = int.from_bytes(data[0:2], 'big')
                if pid in self.sub["init"]:
                    # move from init queue to list of subscribed topics
                    p = self.sub["init"].pop(pid)
                    self.sub["active"][p["topic"]] = p["callback"]
                else:
                    # unexpected pid
                    return

            elif op & 0xf0 == 0x30: # MSG
                toplen = int.from_bytes(data[0:2], 'big')
                topic = data[2:2+toplen].decode("utf-8") 
                
                index = 2+toplen
                if op & 6:
                    pid = int.from_bytes(data[index:index+2], 'big')
                    index += 2
                
                # remaining bytes are message
                message = data[index:].decode("utf-8")

                # invoke callback
                if topic in self.sub["active"]:
                    self.sub["active"][topic](message)
                
    def rx(self, sock):
        # try to read data. Close connection if read fails with error
        try:
            data = self.socket.recv(100)            
        except Exception as e:
            self.disconnect()
            return
            
        # server closed connection
        if not data or data == b'':                
            self.socket.close()
            self.socket = None
            return
        
        # append newly received data to buffer
        self.rx_buffer.extend(data)
        
        # the buffer is complete if it contains the control byte, a complete
        # length field and suffcient payload bytes
        l = self.check4pkt(self.rx_buffer)
        if not l: return

        op = self.rx_buffer[0]   # operation is first byte, followed by variable lenght field
        data = self.rx_buffer[l[0]:l[0]+l[1]]
        self.rx_buffer = self.rx_buffer[l[0]+l[1]:-1]

        self.parse_pkt(op, data)
                
    def send_str(self, str):
        self.socket.write(struct.pack("!H", len(str)))
        self.socket.write(str)

    def next_pid(self):
        self.pid = self.pid + 1 if self.pid < 65535 else 1        
        return self.pid

    def publish(self, topic, msg, retain=False, qos=0, dup=0):
        if not self.socket: return
        
        pid = self.next_pid()
        
        pkt = bytearray(b"\x30\0\0\0")
        pkt[0] |= qos << 1 | retain | dup << 3
        sz = 2 + len(topic) + len(msg)
        if qos > 0:
            sz += 2
        i = 1
        while sz > 0x7f:
            pkt[i] = (sz & 0x7f) | 0x80
            sz >>= 7
            i += 1
        pkt[i] = sz
        self.socket.write(pkt, i + 1)
        self.send_str(topic)
        if qos > 0:
            struct.pack_into("!H", pkt, 0, pid)
            self.socket.write(pkt, 2)
        self.socket.write(msg)

    def subscribe(self, topic, cb, qos=0):
        if not self.socket: return
        
        pid = self.next_pid()
        self.sub["init"][pid] = { "callback": cb, "topic": topic }
                
        pkt = bytearray(b"\x82\0\0\0")
        struct.pack_into("!BH", pkt, 1, 2 + 2 + len(topic) + 1, pid)
        self.socket.write(pkt)
        self.send_str(topic)
        self.socket.write(qos.to_bytes(1, "little"))

    def send_ping(self):
        if not self.socket: return
        self.socket.write(b"\xc0\0")

# create an instance
mqtt = mqtt_lite()
