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

def get_name():
    # if the GUI is running this should return the name
    # used for the WIFI. Otherwise it just returns ftDuino32    
    print("GET NAME");
    
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

class I2C_TYPE:
    BYTE = 0x00
    INT16LE = 0x01
    INT32LE = 0x02
    INT16BE = 0x03
    INT32BE = 0x04
    
def i2c_write(bus, addr, reg, type, value):
    # try to get array length
    try:
        cnt = len(value)
    except:
        value = [ value ]

    data = bytearray()        
    for v in value:
        if type == I2C_TYPE.BYTE:
            data.extend(bytearray([int(v)]))
        elif type == I2C_TYPE.INT16LE:
            data.extend((v).to_bytes(2, 'little'))
        elif type == I2C_TYPE.INT32LE:
            data.extend((v).to_bytes(4, 'little'))
        elif type == I2C_TYPE.INT16BE:
            data.extend((v).to_bytes(2, 'big'))
        elif type == I2C_TYPE.INT32BE:
            data.extend((v).to_bytes(4, 'big'))

    if len(data):
        try:
            bus.writeto_mem(addr, reg, data);
        except:
            # ftDuino write failed, silently return anyway
            pass

def i2c_read(bus, addr, reg, type, num):
    # get type size
    if type == I2C_TYPE.INT16LE or type == I2C_TYPE.INT16BE:
        size = 2
    elif type == I2C_TYPE.INT32LE or type == I2C_TYPE.INT32BE:
        size = 4
    else:
        size = 1
        
    try:
        bytes = bus.readfrom_mem(addr, reg, size * num)
    except:
        # ftDuino read failed, silently return anyway
        return None

    value = [ ]
    for i in range(num):
        bs = bytes[i*size:(i+1)*size]
        if type == I2C_TYPE.BYTE or type == I2C_TYPE.INT16LE or type == I2C_TYPE.INT32LE:
            value.append(int.from_bytes(bs, 'little'))
        elif type == I2C_TYPE.INT16BE or type == I2C_TYPE.INT32BE:
            value.append(int.from_bytes(bs, 'big'))

    # don't return single values as array
    if len(value) == 1:
        value = value[0]
    
    return value
