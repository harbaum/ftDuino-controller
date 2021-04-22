from llvgl import *

btn = None
counter = None
lbl = None

def on_btn_clicked(btn,_e):
    global counter, lbl
    counter = counter + 1
    widget_set_text(lbl, ('Clicks: ' + str(counter)));


window_set_title('My Little Test', "#006600")
counter = 0
lbl = widget_new(TYPE.LABEL);
widget_set_text(lbl, 'No clicks yet!');
widget_set_align(lbl, None, ALIGN.CENTER, 0, -30);
btn = widget_new(TYPE.BUTTON);
widget_set_event_handler(btn, EVENT.CLICKED, on_btn_clicked)
widget_set_text(btn, 'Click Me!');
widget_set_align(btn, None, ALIGN.CENTER, 0, 30);

