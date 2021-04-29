from llvgl import *
from mqtt import mqtt

button = None
led = None
object2 = None
message = None

def on_mqtt_led(message):
    global button, led, object2
    widget_set_value(led,(message == 'on'))

# Describe this function...
def setup_led():
    global button, led, object2, message
    led = widget_new(TYPE.LED);
    widget_set_value(led,False)
    widget_set_align(led, button, ALIGN.BELOW, 40);
    widget_set_size(led, 60, 60);
    widget_set_colour(led,'#ff0000');
    mqtt.subscribe('led', on_mqtt_led)

def on_button_clicked(button,_e):
    global led, object2, message
    mqtt.publish('button', 'click')


window_set_title('MQTT_Demo', "#0074d9")
window_set_content_color("#f0f0f0")
if mqtt.connect("192.168.0.77"):
    button = widget_new(TYPE.BUTTON);
    widget_set_event_handler(button, EVENT.CLICKED, on_button_clicked)
    widget_set_size(button, 200, 40);
    widget_set_colour(button,'#009900');
    widget_set_text(button, 'Click to publish');
    widget_set_align(button, None, ALIGN.IN_TOP_MID, 0, 20);
    setup_led()
else:
    object2 = widget_new(TYPE.LABEL);
    widget_set_text(object2, 'Connection failed!');

def on_window_close():
    global button, led, object2, message
    mqtt.disconnect()

window_on_close(on_window_close)

