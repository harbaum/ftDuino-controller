#
# ftduino.py
#

from machine import Pin, PWM
from utime import sleep
    
class controller:
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
