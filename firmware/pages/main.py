import os
import gui
import lvgl as lv  # this should all go into gui

class Page_Main:
    ICONS = [ "sdcard", "wifi" ]
    ICON_CHAR = { "sdcard": lv.SYMBOL.SD_CARD,
                  "wifi": lv.SYMBOL.WIFI }
    
    def __init__(self, page):
        self.page = page

        # display ftDuino32 "title"
        label = lv.label(page)
        label.set_recolor(True);
        label.set_text("#ff0000 f##0000ff t##00664c Duino#32")
        style = lv.style_t()
        style.set_text_font(lv.STATE.DEFAULT, lv.font_montserrat_16)
        label.add_style(lv.label.PART.MAIN, style)
        label.align(page, lv.ALIGN.CENTER, 0, -100)

        # display user definabled device name
        self.dname = lv.label(page)
        self.set_device_name("ftDuino32")

        # display release
        rlabel = lv.label(page)
        rlabel.set_text("Release: ")
        if hasattr(os, "uname"):
            rlabel.ins_text(lv.LABEL_POS.LAST, os.uname().release)
        else:
            rlabel.ins_text(lv.LABEL_POS.LAST, "<unknown>")            
        rlabel.align(page, lv.ALIGN.CENTER, 0, -40)

        # display version
        vlabel = lv.label(page)
        vlabel.set_long_mode(lv.label.LONG.BREAK);
        vlabel.set_width(210);
        vlabel.set_align(lv.label.ALIGN.CENTER)
        if hasattr(os, "uname"):
            vlabel.set_text(os.uname().version)
        else:
            vlabel.set_text("<unknown version>")
            
        vlabel.align(page, lv.ALIGN.CENTER, 0, -10)

        scroll = lv.label(page)
        scroll.set_long_mode(lv.label.LONG.SROLL_CIRC);
        scroll.set_width(150);
        scroll.set_recolor(True);
        scroll.set_text("Thank you for using the #ff0000 f##0000ff t##00664c Duino#32 controller.")
        scroll.align(page, lv.ALIGN.CENTER, 0, 40)
        
        # add two status bar labels for wifi and sd card
        self.status = { }
        labelstyle = lv.style_t()
        labelstyle.set_text_color(lv.STATE.DEFAULT, lv.color_hex3(0xccc))
        labelstyle.set_text_font(lv.STATE.DEFAULT, lv.font_montserrat_16)
        for i in self.ICONS:
            self.status[i] = lv.label(page)
            self.status[i].set_text(self.ICON_CHAR[i])
            self.status[i].add_style(lv.label.PART.MAIN, labelstyle)
            self.status[i].align(page, lv.ALIGN.CENTER, 16-32*self.ICONS.index(i), 100)

    def set_device_name(self, name):
        self.dname.set_text(name)
        self.dname.align(self.page, lv.ALIGN.CENTER, 0, -70)
            
    def set_status(self, which, what):
        labelstyle = lv.style_t()
        if what:
            labelstyle.set_text_color(lv.STATE.DEFAULT, lv.color_hex3(0x080))
        else:
            labelstyle.set_text_color(lv.STATE.DEFAULT, lv.color_hex3(0xccc))

        self.status[which].add_style(lv.label.PART.MAIN, labelstyle)
    
