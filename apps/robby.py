# robby.py - fischertechnik ROBBY implementation
#
# (c) 2022 by Till Harbaum <till@harbaum.org>
#
# This code implements the communication protocol of the fischertechnik early
# coding controller ("robby") in Micropython. This allows to e.g. control
# the ESP32 using the fischertechnik first coding app.
#

import bluetooth, struct, time

NAME = "Robby32"
DEV_INFO = True # False    # enable device info characteristics

# the custom ft Robby service. 
_ROBBY_UUID = bluetooth.UUID("7b130100-ce8d-45bb-9158-631b769139e9")
_ROBBY_SERVICE = (
  _ROBBY_UUID, (
    ( bluetooth.UUID("7b130101-ce8d-45bb-9158-631b769139e9"), 0x0a ),  # R/W
    ( bluetooth.UUID("7b130102-ce8d-45bb-9158-631b769139e9"), 0x0a ),  # R/W
    ( bluetooth.UUID("7b130103-ce8d-45bb-9158-631b769139e9"), 0x0a ),  # R/W
    ( bluetooth.UUID("7b130104-ce8d-45bb-9158-631b769139e9"), 0x12 ),  # R/N
    ( bluetooth.UUID("7b130105-ce8d-45bb-9158-631b769139e9"), 0x12 ),  # R/N
    ( bluetooth.UUID("7b130106-ce8d-45bb-9158-631b769139e9"), 0x12 ),  # R/N
    ( bluetooth.UUID("7b130107-ce8d-45bb-9158-631b769139e9"), 0x12 )   # R/N
  ),
)

_BATT_SERVICE = (
  bluetooth.UUID("0000180f-0000-1000-8000-00805f9b34fb"), (
    ( bluetooth.UUID("00002a19-0000-1000-8000-00805f9b34fb"), 0x12 ),  # R/N
  ),
)

if DEV_INFO:
  _DEVICE_INFO = (
    bluetooth.UUID("0000180a-0000-1000-8000-00805f9b34fb"), (    # all read only
      ( bluetooth.UUID("00002a29-0000-1000-8000-00805f9b34fb"), 0x02 ), # MFR_NAME
      ( bluetooth.UUID("00002a24-0000-1000-8000-00805f9b34fb"), 0x02 ), # MODEL
      ( bluetooth.UUID("00002a25-0000-1000-8000-00805f9b34fb"), 0x02 ), # SERIAL
      ( bluetooth.UUID("00002a27-0000-1000-8000-00805f9b34fb"), 0x02 ), # HW_REV
      ( bluetooth.UUID("00002a26-0000-1000-8000-00805f9b34fb"), 0x02 ), # FW_REV
      ( bluetooth.UUID("00002a23-0000-1000-8000-00805f9b34fb"), 0x02 ), # SYS_ID
    ),
  )

class FtRobby:
    def __init__(self, name=NAME):
        self._ble = bluetooth.BLE()
        self._ble.config(gap_name=name)
        self._ble.active(True)
        self._ble.irq(self._irq)
        if DEV_INFO:
            self._handle = self._ble.gatts_register_services((_ROBBY_SERVICE,_BATT_SERVICE,_DEVICE_INFO))
        else:
            self._handle = self._ble.gatts_register_services((_ROBBY_SERVICE,_BATT_SERVICE))
        self._conn_handle = None

        # no background task in progress
        self.task = None

        # assemble advertisement data, mainly the device name and the robby service uuid
        self.adv_payload = bytes()
        self.adv_append(0x01, struct.pack("B", 0x06))
        self.adv_append(0x09, name)
        self.adv_append(0x07, bytes(_ROBBY_UUID))

        # set default values
        self._ble.gatts_write(self._handle[0][3], b"\x04\x00")  # unknown 2 byte default value
        self._ble.gatts_write(self._handle[0][4], b"\x89\x40")  # unknown value. brightness limits?
        self._ble.gatts_write(self._handle[0][5], b"\x24\x40")  # unknown value. brightness limits?
        if DEV_INFO:
          self._ble.gatts_write(self._handle[0][6], b"\x00\x48\x00\x0a\xd5\xe7\x88\xbe\x00\x24\x25\x02\xbf\xff\xeb\xfe\xb0\xd0\x05\x01\xdb\xfb\x5f\xfd\x06\x05\x80\x00\xdf\xfb\x76\xe7\x25\x13\x89\xe2\xb7\xf3\x3d\x3e\x84\x56")
        self._ble.gatts_write(self._handle[1][0], bytes([50]))  # battery info is needed by app

        if DEV_INFO:
            self._ble.gatts_write(self._handle[2][0], b"fischertechnik")
            self._ble.gatts_write(self._handle[2][1], b"559889")
            self._ble.gatts_write(self._handle[2][2], b"1000")
            self._ble.gatts_write(self._handle[2][3], b"Rev-A0")
            self._ble.gatts_write(self._handle[2][4], b"0.9.0.1")
            self._ble.gatts_write(self._handle[2][5], b"\x06\x73\x14\x96\x20\x00\x00\x00")

        # start advertising
        self._ble.gap_advertise(100000, adv_data=self.adv_payload)

    def adv_append(self, adv_type, value):
        self.adv_payload += struct.pack("BB", len(value) + 1, adv_type) + value

    def update_status(self, mask, set):
        data = list(self._ble.gatts_read(self._handle[0][3]))
        old = list(data)

        if len(data) == 2:  # initially it's only two bytes 4,0
            data = [ 0,0,0,0 ]

        # mask and set bits
        for i in range(len(data)):
            data[i] = (data[i] & ~mask[i]) | set[i]

        self._ble.gatts_write(self._handle[0][3], bytes(data))

        if self._conn_handle != None and data != old:
            print("STATUS", data)
            self._ble.gatts_notify(self._conn_handle, self._handle[0][3], bytes(data))

    def _irq(self, event, data):
        if event == 1:    # central connect
            self._conn_handle, _, _ = data
        elif event == 2:  # central disconnect
            self._conn_handle = None
            # Start advertising again to allow a new connection.
            self._ble.gap_advertise(100000, adv_data=self.adv_payload)

        elif event == 3:  # GATTS write
            conn_handle, value_handle = data
            value = self._ble.gatts_read(value_handle)
            if conn_handle == 0:
                # 
              
                if len(value) == 1:
                    if value[0] == 0:
                        print("STOP")
                        if self.task:
                            print("CANCEL TASK")
                            # if a status was scheduled, then send 
                            # an "all stopped" status instead
                            self.update_status( [ 0, 0x0f,0xf8, 0], [ 0,0,0,0 ] )
                            self.task = None
                    else:
                        print("unexpected", value)
                elif len(value) == 2:
                    if value[0] == 52 and value[1] == 1:
                        self.calibrate()
                    else:
                        print("unexpected", value)
                elif len(value) == 3:
                    if value[2] == 0:
                        l, r, _ = struct.unpack("bbb", value)
                        print("DRIVE", str(l)+"%", str(r)+"%")
                    else:
                        print("unexpected", value)
                elif len(value) == 4:
                    if value[0] == 1 and value[1] == 5 and value[3] == 0:
                        _, _, s, _ = struct.unpack("bbbb", value)
                        self.follow(s)
                    else:
                        print("unexpected", value)
                elif len(value) == 8:
                    if value[0] == 4 and value[3] == 1 and value[7] == 0:                       
                        _, l, r, _, d, id, _ = struct.unpack("bbbbhbb", value)
                        self.drive_for(id, l, r, d)
                    else:
                        print("unexpected", value)
                else:
                    print("handle0: ", end="")
                    for i in value:
                        if i > 127: i = i-256
                        print(i, " ", end="")
                    print("")
            else:
                print("GATT write", conn_handle, value)

    def set_led(self, l, r):
        # True = white
        b = (0x10 if l else 0x00) | (0x20 if r else 0x00)
        self.update_status( [0xf0,0,0,0], [b,0,0,0] )

    def set_bumper(self, l, r):
        # True = pressed
        b = (0x01 if l else 0x00) | (0x02 if r else 0x00)
        self.update_status( [0x0f,0,0,0], [b,0,0,0] )

    def schedule(self, time, task, data):
        self.task = ( time, task, data )       

        # the following three commands are running longer and send
        # status information back to report their progress
    def drive_for(self, id, l, r, d):
        print("DRIVE", str(l)+"%", str(r)+"%", "FOR", str(d/100)+"sec")
        self.update_status( [0,0,0xff,0], [0,0,id+0x40,0] ) # report cmd in progress
        # after 1 sec report done
        self.schedule( time.ticks_ms() + 10*d, "status", ( [0,0,0x08,0], [0,0,0x08,0] ) ) 

    def follow(self, s):
        print("FOLLOW LINE @", str(s)+"%")
        self.update_status([0xf0,0x0f,0xf0,0], [0,0,0x10,0]) # report cmd in progress
        # after 5 sec report done
        self.schedule( time.ticks_ms() + 5000, "status", ( [0,0x0f,0xf0,0], [0,1,0,0] ) ) 

    def calibrate(self):
        print("CALIBRATE")
        self.update_status([0,0xff,0,0],[0,0x01,0,0])   # report cmd in progress
        # after 1 sec report done
        self.schedule( time.ticks_ms() + 1000, "status", ( [0,0xff,0,0],[0,0x41,0,0] ) ) 

    def poll(self):
        if self.task and time.ticks_ms() > self.task[0]:
            if self.task[1] == "status":
                self.update_status( self.task[2][0], self.task[2][1] )
            else:
                print("unexpected task", self.task[1])

            self.task = None

def run():
    p = FtRobby()
    print("FtRobby service running")

    while True:
        # handle tasks
        p.poll()
        # sleep a moment
        time.sleep_ms(10)
    
if __name__ == "__main__":
    run()    

