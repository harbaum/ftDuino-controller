import ftduino
from machine import Pin, I2C
from llvgl import *
import math

i2cBus = I2C(0,scl=Pin(22),sda=Pin(21))
value = None
object2 = None


window_set_title('Gauge Demo', "#666600")
value = 0
ftduino.i2c_write(i2cBus, 43, ftduino.INPUT_MODE.I1, ftduino.I2C_TYPE.BYTE, ftduino.INPUT_MODE.R)
object2 = widget_new(TYPE.GAUGE);
widget_set_align(object2, None, ALIGN.CENTER, 0, 0);
widget_set_colour(object2,['#ff0000', '#ffcc00', '#009900']);
def __llvgl_task_0(__timer):
    global value, object2, i2cBus
    widget_set_value(object2,[50 + 50 * math.sin(value / 180.0 * math.pi), 50 + 25 * math.cos(value / 180.0 * math.pi), (ftduino.i2c_read16(i2cBus, 43, ftduino.INPUT_VALUE.I1)) / 47])
    value = value + 1

timer_start(0.01, __llvgl_task_0);

