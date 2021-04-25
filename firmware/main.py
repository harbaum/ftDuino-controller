#
# main.py -  main file for ftDuino32 Controller user interface
#

import gui

import sys, time
import machine, uos

import lvgl as lv

from pages import main
from pages import wifi
from pages import apps
            
class Screen_Main(lv.obj):
    def __init__(self, *args, **kwds):
        super().__init__(*args, **kwds)
        self.tabview = lv.tabview(self)

        self.tabview.set_size(240, 320);
        self.tabview.align(self, lv.ALIGN.IN_TOP_MID, 0, 0)

        self.mainpage = main.Page_Main(self.tabview.add_tab("Main"))
        self.wifipage = wifi.Page_WiFi(self.tabview.add_tab("WiFi"), self)
        self.appspage = apps.Page_Apps(self.tabview.add_tab("Apps"), self)

        try:
            self.sd = machine.SDCard(slot=2, sck=14, miso=12, mosi=13, cs=15)
            uos.mount(self.sd, '/sd')
            print("SD card mounted")
            self.mainpage.set_status("sdcard", True);
        except Exception as e:
            import sys
            sys.print_exception(e)

    def http_server_poll(self):
        if not self.wifipage.server: return None
        return self.wifipage.server.get_command()
            
    def set_status(self, which, what):
        # status is being displayed on the main page
        self.mainpage.set_status(which, what);

    def set_device_name(self, name):
        # device name as being displayed on the main page and being used
        # for DHCP, MDNS etc ...
        self.mainpage.set_device_name(name)
        
try:
    import ftduino
    # beep for "main loaded" 
    ftduino.led_yellow(False)
    ftduino.led_green(True)
    ftduino.beep()
except:
    pass
    
# run the user interface
g = gui.Gui(Screen_Main)
g.run();
