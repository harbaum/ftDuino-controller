# This file is executed on every boot (including wake-boot from deepsleep)
import machine
machine.freq(240000000)
machine.Pin(2, machine.Pin.OUT).value(1)
machine.Pin(4, machine.Pin.OUT).value(0)

