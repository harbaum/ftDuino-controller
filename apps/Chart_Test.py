import ftduino
from machine import Pin, I2C
from llvgl import *

i2cBus = I2C(0,scl=Pin(22),sda=Pin(21))
label = None
chart = None


window_set_title('Chart Test', "#006600")
window_set_content_color("#ffcc99")
ftduino.i2c_write(i2cBus, 43, ftduino.INPUT_MODE.I1, ftduino.INPUT_MODE.R)
ftduino.i2c_write(i2cBus, 43, ftduino.INPUT_MODE.I2, ftduino.INPUT_MODE.R)
label = widget_new(TYPE.LABEL);
widget_set_text(label, 'I1 & I2 resistance');
widget_set_align(label, None, ALIGN.IN_TOP_MID, 0, 20);
chart = widget_new(TYPE.CHART);
widget_set_size(chart, 200, 200);
widget_set_align(chart, None, ALIGN.CENTER, 0, 10);
widget_set_colour(chart,['#993399', '#cc9933']);
def __llvgl_task_0(__timer):
    global label, chart, i2cBus
    widget_set_value(chart,[(ftduino.i2c_read16(i2cBus, 43, ftduino.INPUT_VALUE.I1)) / 47, (ftduino.i2c_read16(i2cBus, 43, ftduino.INPUT_VALUE.I2)) / 47])

timer_start(0.1, __llvgl_task_0);

