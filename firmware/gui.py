import lvgl as lv

# lvgl must be initialized before any lvgl function is called or object/struct is constructed!
lv.init();

class DialogBox(lv.obj):
    # https://github.com/lvgl/lvgl/issues/867
    # https://docs.lvgl.io/v7/en/html/widgets/msgbox.html

    def __init__(self, text, *args, **kwds):        
        super().__init__(*args, **kwds)

        # styly of the background overlay
        self.style = lv.style_t()
        self.style.init();
        self.style.set_bg_opa(lv.STATE.DEFAULT, lv.OPA._60);
        self.style.set_bg_color(lv.STATE.DEFAULT, lv.color_hex3(0x000));
    
        # create a base object for the modal background
        self.reset_style_list(lv.obj.PART.MAIN);
        self.add_style(lv.obj.PART.MAIN, self.style);
        self.set_pos(0, 0);
        self.set_size(240, 320);

        self.mbox = lv.msgbox(self);
        self.mbox.set_text(text)
        self.mbox.add_btns([ "OK", "" ]);
        self.mbox.set_width(200);
        self.mbox.align(lv.scr_act(), lv.ALIGN.CENTER, 0, 0);
        self.mbox.set_event_cb(self.mbox_event_cb);
        
        self.g = lv.group_t();
        self.g.add_obj(self.mbox);  
        lv.group_focus_obj(self.mbox);
        self.g.focus_freeze(True);

    def mbox_event_cb(self, obj, evt):
        if evt == lv.EVENT.DELETE:
            obj.get_parent().del_async();
        elif evt == lv.EVENT.VALUE_CHANGED:
            obj.start_auto_close(0);
            
class ColorBgStyle(lv.style_t):
    def __init__(self, color):
        super().__init__()
        self.set_bg_opa(lv.STATE.DEFAULT, lv.OPA.COVER);
        self.set_bg_color(lv.STATE.DEFAULT, lv.color_hex3(color))

class Gui:
    def init_gui_SDL(self):
        import SDL

        SDL.init()

        # Register SDL display driver.
        disp_buf1 = lv.disp_buf_t()
        buf1_1 = bytes(480 * 10)
        disp_buf1.init(buf1_1, None, len(buf1_1)//4)
        disp_drv = lv.disp_drv_t()
        disp_drv.init()
        disp_drv.buffer = disp_buf1
        disp_drv.flush_cb = SDL.monitor_flush
        disp_drv.hor_res = 240
        disp_drv.ver_res = 320
        disp_drv.register()

        # Register SDL mouse driver
        indev_drv = lv.indev_drv_t()
        indev_drv.init() 
        indev_drv.type = lv.INDEV_TYPE.POINTER
        indev_drv.read_cb = SDL.mouse_read
        indev_drv.register();

    def init_gui_esp32(self):

        # Initialize ILI9341 display
        from ili9XXX import ili9341
 
        self.disp = ili9341(miso=19, mosi=23, clk=18, cs=5, dc=32, rst=27, spihost=1, power=-1, backlight=33, backlight_on=1, mhz=80, factor=4, double_buffer=True, hybrid=True, asynchronous=True, initialize=True)

        self.disp.send_cmd(0x21);

        # Register xpt2046 touch driver
        from xpt2046 import xpt2046

        self.touch = xpt2046(cs=26, spihost=1, mhz=5, max_cmds=16, cal_x0 = 242, cal_y0 = 423-300, cal_x1 = 3783, cal_y1 = 3948-300, transpose = True, samples = 3)

    def __init__(self, screen):
        
        self.is_sdl = False

        # Identify platform and initialize it
        try:
            self.init_gui_esp32()
        except ImportError:
            pass

        try:
            self.init_gui_SDL()
            self.is_sdl = True
        except ImportError:
            pass

        # Create the main screen and load it.
        self.screen_main = screen()
        lv.scr_load(self.screen_main)

    def run(self):
        if self.is_sdl:
            while True:
                pass
        else:
            from uasyncio import Loop
            from async_utils import lv_async

            lva = lv_async()
            try:
                Loop.run_forever()
            except KeyboardInterrupt:
                print("User interrupt");
