#
# ftduino.py
#

from machine import Pin, PWM, I2C
from utime import sleep

def led_yellow(on):
    Pin(2, Pin.OUT).value(1 if on else 0)

def led_green(on):
    Pin(4, Pin.OUT).value(1 if on else 0)

def beep(freq=440, duration=0.1):
    pwm = PWM(Pin(25, Pin.OUT))
    pwm.duty(512)
    pwm.freq(freq)
    sleep(duration)
    pwm.deinit()

class OUTPUT_MODE:
    O1 = 0x00
    O2 = 0x02
    O3 = 0x04
    O4 = 0x06
    O5 = 0x08
    O6 = 0x0a
    O7 = 0x0c
    O8 = 0x0e
    OFF = 0x00
    HI  = 0x01
    LOW = 0x02

class OUTPUT_VALUE:
    O1 = 0x01
    O2 = 0x03
    O3 = 0x05
    O4 = 0x07
    O5 = 0x09
    O6 = 0x0b
    O7 = 0x0d
    O8 = 0x0f

class INPUT_MODE:
    I1 = 0x10
    I2 = 0x12
    I3 = 0x14
    I4 = 0x16
    I5 = 0x18
    I6 = 0x1a
    I7 = 0x1c
    I8 = 0x1e
    U =  0x00
    R =  0x01
    SW = 0x02
   
class INPUT_VALUE:
    I1 = 0x10
    I2 = 0x12
    I3 = 0x14
    I4 = 0x16
    I5 = 0x18
    I6 = 0x1a
    I7 = 0x1c
    I8 = 0x1e

def i2c_write(bus, addr, reg, value):
    try:
        bus.writeto_mem(addr, reg, bytearray([int(value)]));
    except:
        # ftDuino write failed, silently return anyway
        pass

def i2c_read16(bus, addr, reg):
    try:
        return int.from_bytes(bus.readfrom_mem(addr, reg, 2), 'little')
    except:
        # ftDuino read failed, silently return anyway
        return 0
