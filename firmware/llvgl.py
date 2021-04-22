#
# llvgl.py - little lvgl
#
# Simple non-oo wrapper around LVGL to simplify blockly programs
#
# It e.g. does:
# - simplify the API, e.g. just set one color instead of styles
# - be more robust, e.g. check that object references are valid
# - keep track of alignments and update them when object sizes change
#

# TODO:
# - Use full content area
# - set sane default sizes
# - dark close button bg
# - adjust gauge style on resize

import sys
import lvgl as lv

# make all aligment constants available in the llvgl namespace
class ALIGN:
    OUT_TOP_LEFT = lv.ALIGN.OUT_TOP_LEFT
    OUT_TOP_MID = lv.ALIGN.OUT_TOP_MID
    OUT_TOP_RIGHT = lv.ALIGN.OUT_TOP_RIGHT
    
    OUT_LEFT_TOP = lv.ALIGN.OUT_LEFT_TOP
    IN_TOP_LEFT = lv.ALIGN.IN_TOP_LEFT
    IN_TOP_MID = lv.ALIGN.IN_TOP_MID
    IN_TOP_RIGHT = lv.ALIGN.IN_TOP_RIGHT
    OUT_RIGHT_TOP = lv.ALIGN.OUT_RIGHT_TOP
    
    OUT_LEFT_MID = lv.ALIGN.OUT_LEFT_MID
    IN_LEFT_MID = lv.ALIGN.IN_LEFT_MID
    CENTER = lv.ALIGN.CENTER    
    IN_RIGHT_MID = lv.ALIGN.IN_RIGHT_MID
    OUT_RIGHT_MID = lv.ALIGN.OUT_RIGHT_MID

    OUT_LEFT_BOTTOM = lv.ALIGN.OUT_LEFT_BOTTOM
    IN_BOTTOM_LEFT = lv.ALIGN.IN_BOTTOM_LEFT
    IN_BOTTOM_MID = lv.ALIGN.IN_BOTTOM_MID    
    IN_BOTTOM_RIGHT = lv.ALIGN.IN_BOTTOM_RIGHT
    OUT_RIGHT_BOTTOM = lv.ALIGN.OUT_RIGHT_BOTTOM
      
    OUT_BOTTOM_LEFT = lv.ALIGN.OUT_BOTTOM_LEFT
    OUT_BOTTOM_MID = lv.ALIGN.OUT_BOTTOM_MID
    OUT_BOTTOM_RIGHT = lv.ALIGN.OUT_BOTTOM_RIGHT

    # user friendly names
    BELOW = lv.ALIGN.OUT_BOTTOM_MID
    ABOVE = lv.ALIGN.OUT_TOP_MID
    LEFT_OF = lv.ALIGN.OUT_LEFT_MID
    RIGHT_OF = lv.ALIGN.OUT_RIGHT_MID

class EVENT:
    CLICKED = lv.EVENT.CLICKED
    PRESSED = lv.EVENT.PRESSED
    RELEASED = lv.EVENT.RELEASED
    VALUE_CHANGED = lv.EVENT.VALUE_CHANGED

class TYPE:
    LABEL = 1
    BUTTON = 2
    SWITCH = 3
    CHECKBOX = 4
    SLIDER = 5
    LED = 6
    GAUGE = 7
    CHART = 8
    
# parse a color from blockly to lvgl. Blockly calls
# them colour, lvgl color :-)
def blockly_to_lvgl_color(colour):
    return lv.color_hex(int(colour[1:], 16))

def window_set_title(title, colour = None):
    win = sys.modules['llvgl'].config["win"]
    win.set_title(title)

    if colour:
        win.set_style_local_bg_color(lv.win.PART.HEADER, lv.STATE.DEFAULT, blockly_to_lvgl_color(colour))
    
def window_set_content_color(colour):
    content = sys.modules['llvgl'].config["win"].get_content()
    content.set_style_local_bg_color(lv.obj.PART.MAIN, lv.STATE.DEFAULT, blockly_to_lvgl_color(colour))

def on_event(obj, evt):
    if "events" in obj and evt in obj["events"]:
        obj["events"][evt](obj, evt);
    
def widget_new(type, parm = None):
    config = sys.modules['llvgl'].config        
    content = config["win"].get_content()
    lv_obj = None
    if type == TYPE.LABEL:    
        lv_obj = lv.label(content)
    elif type == TYPE.BUTTON:    
        lv_obj = lv.btn(content)
        # buttons don't scale with the content by default
        lv_obj.set_fit(lv.FIT.TIGHT)  # MAX, NONE, PARENT, TIGHT
    elif type == TYPE.SWITCH:    
        lv_obj = lv.switch(content)
    elif type == TYPE.SLIDER:    
        lv_obj = lv.slider(content)
        # sliders default width is too wide for the 240x320 screen
        lv_obj.set_width(180)
    elif type == TYPE.CHECKBOX:    
        lv_obj = lv.checkbox(content)
    elif type == TYPE.LED:    
        lv_obj = lv.led(content)
        # leds default size is a little big for the 240x320 screen
        lv_obj.set_size(30,30)
    elif type == TYPE.GAUGE:    
        lv_obj = lv.gauge(content)
    elif type == TYPE.CHART:
        lv_obj = lv.chart(content)
        # leds default size is a little big for the 240x320 screen
        lv_obj.set_size(180,180)
    else:
        print("Unknown TYPE");
        return None

    # add new object to internal list
    obj =  { "lv_obj": lv_obj, "type": type }    
    config["objects"].append(obj)

    # set optional parameter if widget support
    if type == TYPE.LABEL or type == TYPE.BUTTON or type == TYPE.CHECKBOX:    
        widget_set_text(obj, parm)
    elif type == TYPE.SWITCH or type == TYPE.LED or type == TYPE.SLIDER:    
        widget_set_value(obj, parm)    
    
    # install default event handler
    lv_obj.set_event_cb(lambda o, e: on_event(obj, e))

    return obj

def get_lvref_obj(obj):
    # if no reference is given, then this is relative to the windows content area
    if not obj: return sys.modules['llvgl'].config["win"].get_content()
    return obj["lv_obj"]    

def update_alignment(obj):
    # Update an objects alignment after e.g. its size or
    # position has changed. Also do this for all objects
    # that have an alignment that depends on this object
    
    # check if there is an alignment known for this object ...
    if "align" in obj:
        a = obj["align"]        
        obj["lv_obj"].align(get_lvref_obj(a["ref"]), a["align"], a["xoff"], a["yoff"]);

    # ... and update all that are aligned relative to this one
    for o in sys.modules['llvgl'].config["objects"]:
        if "align" in o:
            if o["align"]["ref"] == obj:
                update_alignment(o)

def widget_set_text(obj, text):
    if not obj in sys.modules['llvgl'].config["objects"]: return
    if not text: return;
    
    if obj["type"] == TYPE.LABEL or obj["type"] == TYPE.CHECKBOX:
        obj["lv_obj"].set_text(text)
    elif obj["type"] == TYPE.BUTTON:
        # make sure there is a label in that button
        if not "lv_label" in obj:
            obj["lv_label"] = lv.label(obj["lv_obj"])
            
        obj["lv_label"].set_text(text)

    # setting the text may resize the object and we need to re-apply alignment
    update_alignment(obj)

def widget_set_align(obj, ref, align, xoff, yoff = None):
    if not obj in sys.modules['llvgl'].config["objects"]: return

    # set_align can be called with a single offset parameter. This is
    # being used with "above", "below", "left" and "right" and works as
    # a single offset in that direction
    if xoff != None and yoff == None and align in [ ALIGN.ABOVE, ALIGN.BELOW, ALIGN.RIGHT_OF, ALIGN.LEFT_OF ]:
        if align == ALIGN.ABOVE:
             yoff = -xoff
             xoff = 0
        if align == ALIGN.BELOW:
             yoff = xoff
             xoff = 0
        if align == ALIGN.LEFT_OF:
             xoff = -xoff
             yoff = 0
        if align == ALIGN.RIGHT_OF:
             yoff = 0
    
    obj["lv_obj"].align(get_lvref_obj(ref), align, xoff, yoff);    
    
    # save alignment in object to be able to trigger it again later
    obj["align"] = { "ref": ref, "align": align, "xoff": xoff, "yoff": yoff };
    
def widget_set_event_handler(obj, event, handler):
    if not obj in sys.modules['llvgl'].config["objects"]: return
    if not "events" in obj: obj["events"] = { }
    obj["events"][event] = handler
    
# https://docs.lvgl.io/latest/en/html/overview/style.html
def widget_set_colour(obj, colour):
    if not obj in sys.modules['llvgl'].config["objects"]: return
    if colour == None: return;

    # colour may actually be an array of colours
    try:
        len(colour)    # this triggers an exception for non-arrays
        color = [ ]
        for c in colour:
	    color.append(blockly_to_lvgl_color(c))
    except:
        color = [ blockly_to_lvgl_color(colour) ]    

    # prepare some useful colors
    light = lv.color_t.color_lighten(color[0], lv.OPA._30)
    dark = lv.color_t.color_darken(color[0], lv.OPA._20)
    darker = lv.color_t.color_darken(color[0], lv.OPA._50)

    # use color depending on object type. We have disabled focus highlighting, so
    # we don't care for focus colors
    lv_obj = obj["lv_obj"]    
    if obj["type"] == TYPE.LABEL:
        lv_obj.set_style_local_text_color(lv.btn.PART.MAIN, lv.STATE.DEFAULT, color[0])
    elif obj["type"] == TYPE.BUTTON:
	lv_obj.set_style_local_bg_color(lv.btn.PART.MAIN, lv.STATE.DEFAULT, color[0])
	lv_obj.set_style_local_border_color(lv.btn.PART.MAIN, lv.STATE.DEFAULT, dark)
	lv_obj.set_style_local_bg_color(lv.btn.PART.MAIN, lv.STATE.PRESSED, dark)
	lv_obj.set_style_local_border_color(lv.btn.PART.MAIN, lv.STATE.PRESSED, darker)
    elif obj["type"] == TYPE.SWITCH:
        lv_obj.set_style_local_bg_color(lv.switch.PART.KNOB, lv.STATE.DEFAULT, color[0])
        lv_obj.set_style_local_bg_color(lv.switch.PART.INDIC, lv.STATE.DEFAULT, dark)
    elif obj["type"] == TYPE.SLIDER:
        lv_obj.set_style_local_bg_color(lv.switch.PART.KNOB, lv.STATE.DEFAULT, color[0])
        lv_obj.set_style_local_bg_color(lv.switch.PART.INDIC, lv.STATE.DEFAULT, dark)
    elif obj["type"] == TYPE.CHECKBOX:
        lv_obj.set_style_local_bg_color(lv.checkbox.PART.BULLET, lv.STATE.DEFAULT, color[0])
	lv_obj.set_style_local_border_color(lv.checkbox.PART.BULLET, lv.STATE.DEFAULT, dark)
        lv_obj.set_style_local_bg_color(lv.checkbox.PART.BULLET, lv.STATE.CHECKED, dark)
	lv_obj.set_style_local_border_color(lv.checkbox.PART.BULLET, lv.STATE.CHECKED, darker)
        lv_obj.set_style_local_bg_color(lv.checkbox.PART.BULLET, lv.STATE.PRESSED, dark)
	lv_obj.set_style_local_border_color(lv.checkbox.PART.BULLET, lv.STATE.PRESSED, darker)
        lv_obj.set_style_local_bg_color(lv.checkbox.PART.BULLET, lv.STATE.CHECKED |  lv.STATE.PRESSED, darker)
	lv_obj.set_style_local_border_color(lv.checkbox.PART.BULLET, lv.STATE.CHECKED |  lv.STATE.PRESSED, darker)
    elif obj["type"] == TYPE.LED:
        lv_obj.set_style_local_bg_color(lv.led.PART.MAIN, lv.STATE.DEFAULT, color[0])
        lv_obj.set_style_local_border_color(lv.led.PART.MAIN, lv.STATE.DEFAULT, light)
        lv_obj.set_style_local_shadow_color(lv.led.PART.MAIN, lv.STATE.DEFAULT, color[0])
    elif obj["type"] == TYPE.CHART:
        # setting colors on a chart actually does quite some magic as this is what
        # creates the charts series
        obj["series"] = [ ]
        for c in color:
            obj["series"].append(lv_obj.add_series(c))
    elif obj["type"] == TYPE.GAUGE:
	lv_obj.set_needle_count(len(color), color)
    else:
        print("set color not supported");

def widget_set_size(obj, w, h):
    if w == None and h == None: return    
    if not obj in sys.modules['llvgl'].config["objects"]: return
    lv_obj = obj["lv_obj"]

    # undo any automatic sizing
    if obj["type"] == TYPE.BUTTON:
        lv_obj.set_fit(lv.FIT.NONE)

    if w != None and h != None:
        lv_obj.set_size(w, h);
    elif w != None:
        lv_obj.set_width(w);
    elif h != None:
        lv_obj.set_height(h);
        
    # calculate some line width
    s = lv_obj.get_height()
    if lv_obj.get_width() < lv_obj.get_height(): s = lv_obj.get_width()
    s = s//50

    # some widgets need some scaling themselves 
    if obj["type"] == TYPE.GAUGE:
#        lv_obj.set_style_local_scale_border_width(lv.gauge.PART.MAIN, lv.STATE.DEFAULT, 0)
#        lv_obj.set_style_local_scale_width(lv.gauge.PART.MAIN, lv.STATE.DEFAULT, 10)
#        lv_obj.set_style_local_pad_all(lv.gauge.PART.MAIN, lv.STATE.DEFAULT, 0)      
        lv_obj.set_style_local_line_width(lv.gauge.PART.NEEDLE, lv.STATE.DEFAULT, s)  # needle
        lv_obj.set_style_local_line_width(lv.gauge.PART.MAIN, lv.STATE.DEFAULT, s)    # small ticks
        lv_obj.set_style_local_line_width(lv.gauge.PART.MAJOR, lv.STATE.DEFAULT, s)   # big ticks

    update_alignment(obj)
        
def widget_set_value(obj, value, animate = False):
    if not obj in sys.modules['llvgl'].config["objects"]: return
    if value == None: return;

    if animate: animate = lv.ANIM.ON
    else:       animate = lv.ANIM.OFF
    
    # values may sometimes come as an array. Make them always an array
    # to unify further processing
    try:
        len(value)    # this triggers an exception for non-arrays
        values = [ ]
        for v in value:
	    values.append(int(v))
    except:
        values = [ int(value) ]

    lv_obj = obj["lv_obj"]    
    if obj["type"] == TYPE.CHECKBOX:
        lv_obj.set_checked(value);
    elif obj["type"] == TYPE.SWITCH:
        if value: lv_obj.on(animate)
        else:     lv_obj.off(animate)
    elif obj["type"] == TYPE.LED:
        if value: lv_obj.on()
        else:     lv_obj.off()
    elif obj["type"] == TYPE.SLIDER:
        lv_obj.set_value(value, animate);
    elif obj["type"] == TYPE.CHART:
        # setting data on a chart pushed the date into
        # the series
        for i in range(len(values)):
            if i < len(obj["series"]) and values[i] != None:
                lv_obj.set_next(obj["series"][i], values[i])
    elif obj["type"] == TYPE.GAUGE:
        for i in range(len(values)):
            lv_obj.set_value(i, values[i])

def widget_get_value(obj):
    if not obj in sys.modules['llvgl'].config["objects"]: return
    lv_obj = obj["lv_obj"]    
    if obj["type"] == TYPE.CHECKBOX:
        return lv_obj.is_checked();
    elif obj["type"] == TYPE.SWITCH:
	return lv_obj.get_state()
    elif obj["type"] == TYPE.SLIDER:
	return lv_obj.get_value() 
    return None

# -----------------------------------------------------------------------------
# ---------------------------------     timer    ------------------------------
# -----------------------------------------------------------------------------
        
def on_timer(t):
    # All this may already been cleaned up.
    if not 'llvgl' in sys.modules:                    return
    if not "timer" in sys.modules['llvgl'].config:    return
    if not t in sys.modules['llvgl'].config["timer"]: return
    
    if t["handler"]: t["handler"](t)

def timer_start(rate, handler):
    if not "timer" in sys.modules['llvgl'].config:
        sys.modules['llvgl'].config["timer"] = [ ]
        
    timer = { "rate": rate, "handler": handler }
    timer["task"] = lv.task_create(lambda o: on_timer(timer), int(rate*1000), lv.TASK_PRIO.MID, None)
        
    sys.modules['llvgl'].config["timer"].append(timer)
    return timer

def timer_stop(t):
    # sanity check for valid timer
    if not "timer" in sys.modules['llvgl'].config:    return
    if not t in sys.modules['llvgl'].config["timer"]: return
    
    t["task"].set_repeat_count(0)
    sys.modules['llvgl'].config["timer"].remove(t)

def close():
    # stop all timer tasks
    if "timer" in sys.modules['llvgl'].config:
        for t in sys.modules['llvgl'].config["timer"]:
            t["task"].set_repeat_count(0)

        # delete the whole timer queue
        sys.modules['llvgl'].config.pop("timer")
    
# run app directly for unix if requested
if __name__ == "__main__":
    if len((sys.argv)) == 2:
        name = sys.argv[1]
        if name.endswith(".py"):
            name = name[:-3]

        lv.init()

        running = True;
        
        def on_close(obj, evt):
            global running
            lv.win.close_event_cb(lv.win.__cast__(obj), evt)                
            if evt == lv.EVENT.CLICKED:
                running = False
                close();
    
        # --------------------------------------------------
        # --            init SDL video on unix            --
        # --------------------------------------------------
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
    
        # create window to run the app in
        win = lv.win(lv.scr_act())

        # add close button to the header
        close_btn = win.add_btn_right(lv.SYMBOL.CLOSE)
        close_btn.set_event_cb(on_close)

        # make windows availabel to all llvgl instances
        import llvgl
        sys.modules['llvgl'].config = { "win": win, "objects": [ ] }
        
        exec('import ' + name, {} )

        while running:
            pass
