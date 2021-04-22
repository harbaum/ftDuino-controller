#
# chart.py - demo app containing the chart page from the advanced demo
#

import lvgl as lv
import gui

class ColorStyle(lv.style_t):
    def __init__(self, color):
        super().__init__()
        self.set_bg_opa(lv.STATE.DEFAULT, lv.OPA.COVER);
        self.set_bg_color(lv.STATE.DEFAULT, lv.color_hex3(color))
        self.set_bg_grad_color(lv.STATE.DEFAULT, lv.color_hex3(0xFFF));
        self.set_bg_grad_dir(lv.STATE.DEFAULT, lv.GRAD_DIR.VER);
        self.set_bg_main_stop(lv.STATE.DEFAULT, 0);
        self.set_bg_grad_stop(lv.STATE.DEFAULT, 128);

class ChartPaddingStyle(lv.style_t):
    def __init__(self):
        super().__init__()
        self.set_pad_left(lv.STATE.DEFAULT, 10);
        self.set_pad_right(lv.STATE.DEFAULT, 10);
        self.set_pad_bottom(lv.STATE.DEFAULT, 10);
        self.set_pad_top(lv.STATE.DEFAULT, 10);

class Anim(lv.anim_t):
    def __init__(self, obj, val, size, exec_cb, path_cb, time=500, playback=False, ready_cb=None):
        super().__init__()
        self.init()
        self.set_time(time)
        self.set_values(val, val + size)
        if callable(exec_cb):
            self.set_custom_exec_cb(exec_cb)
        else:
            self.set_exec_cb(obj, exec_cb)
        path = lv.anim_path_t({'cb': path_cb})
        self.set_path(path)
        if playback:
            self.set_playback(0)
        if ready_cb:
            self.set_ready_cb(ready_cb)
        self.start()
        
class AnimatedChart(lv.chart):
    def __init__(self, parent, val, size):
        super().__init__(parent)
        self.val = val
        self.size = size
        self.max = 2000
        self.min = 500
        self.factor = 100
        self.anim_phase1()

    def anim_phase1(self):
        self.phase = Anim(
            self,
            self.val,
            self.size,
            lambda a, val: self.set_y_range(self.AXIS.PRIMARY_Y,0, val),
            lv.anim_path_t.ease_in,
            ready_cb=lambda a:self.anim_phase2(),
            time=(self.max * self.factor) // 100,
        )

    def anim_phase2(self):
        self.phase = Anim(
            self,
            self.val + self.size,
            -self.size,
            lambda a, val: self.set_y_range(self.AXIS.PRIMARY_Y, 0, val),
            lv.anim_path_t.ease_out,
            ready_cb=lambda a:self.anim_phase1(),
            time=(self.min * self.factor) // 100,
        )

class Page:
    # optional name to be used in window title
    def title():
        return "Chart";

    def close(self):
        # delete all animations. Not doing this will crash the
        # entire engine
        self.chart.phase.custom_del(None);
        
    def __init__(self, page):
        self.page = page
        self.chart = AnimatedChart(page, 100, 1000)
        self.chart.set_width(page.get_width() - 80)
        self.series1 = self.chart.add_series(lv.color_hex(0xFF0000))
        self.chart.set_type(self.chart.TYPE.LINE)
        self.chart.set_style_local_line_width(self.chart.PART.SERIES, lv.STATE.DEFAULT, 3)
        self.chart.add_style(self.chart.PART.SERIES, ColorStyle(0x055))
        self.chart.add_style(self.chart.PART.BG, ChartPaddingStyle())
        self.chart.set_y_range(self.chart.AXIS.PRIMARY_Y, 0,100)
        self.chart.init_points(self.series1, 10)
        self.chart.set_points(self.series1, [10, 20, 30, 20, 10, 40, 50, 90, 95, 90])
        self.chart.set_x_tick_texts("a\nb\nc\nd\ne", 2, lv.chart.AXIS.DRAW_LAST_TICK)
        self.chart.set_x_tick_length(10, 5)
        self.chart.set_y_tick_texts("1\n2\n3\n4\n5", 2, lv.chart.AXIS.DRAW_LAST_TICK)
        self.chart.set_y_tick_length(10, 5)
        self.chart.set_div_line_count(3, 3)
        self.chart.set_height(page.get_height() - 60)
        self.chart.align(page, lv.ALIGN.CENTER, 0, 0)

        # Create a slider that controls the chart animation speed

        def on_slider_changed(obj=None, event=-1):
            self.chart.factor = self.slider.get_value()

        self.slider = lv.slider(page)
        self.slider.align(self.chart, lv.ALIGN.OUT_RIGHT_TOP, 10, 0)
        self.slider.set_width(10)
        self.slider.set_height(self.chart.get_height())
        self.slider.set_range(10, 200)
        self.slider.set_value(self.chart.factor, 0)
        self.slider.set_event_cb(on_slider_changed)

