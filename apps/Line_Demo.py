#
# ftDuino controller micropython app example
#

import lvgl as lv
import gui, time

CANVAS_WIDTH  = 216
CANVAS_HEIGHT = 240

class Page:
    STEP = 3
    
    # optional name to be used in window title
    def title():
        return "Lines";

    def clear(self):
        self.canvas.fill_bg(lv.color_hex(0xffffff), lv.OPA.COVER)

    def next_color(self):
        index = self.color_state[0]
        level = self.color_state[1]
        if index == 0:   color = lv.color_make(255, level, 0)
        elif index == 1: color = lv.color_make(255-level, 255, 0)
        elif index == 2: color = lv.color_make(0, 255, level)
        elif index == 3: color = lv.color_make(0, 255-level, 255)
        elif index == 4: color = lv.color_make(level, 0, 255)
        else:            color = lv.color_make(255, 0, 255-level)
        level = level + 6
        if level >= 256:
            level -= 256
            index = index + 1
            if index == 6:
                index = 0

        self.color_state = (index, level)
        return color
        
    def line_task(self, task):
        if not self.task: return   # task is no more
        
        self.line_dsc.color = self.next_color()
        if self.state == 0:
            p1 = lv.point_t( { "x":0, "y":0 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y } )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.x += self.STEP
            if self.x >= CANVAS_WIDTH:
                self.state = 1
                self.x = CANVAS_WIDTH-1
        elif self.state == 1:
            p1 = lv.point_t( { "x":0, "y":0 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y } )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.y -= self.STEP
            if self.y < 0:
                self.state = 2
                self.y = 0
                self.x = 0
        elif self.state == 2:
            p1 = lv.point_t( { "x":CANVAS_WIDTH-1, "y":0 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y } )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.y += self.STEP
            if self.y >= CANVAS_HEIGHT:
                self.state = 3
                self.y = CANVAS_HEIGHT-1
        elif self.state == 3:
            p1 = lv.point_t( { "x":CANVAS_WIDTH-1, "y":0 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y} )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.x += self.STEP
            if self.x >= CANVAS_WIDTH:
                self.state = 4
                self.x = CANVAS_WIDTH-1
                self.y = 0
        elif self.state == 4:
            p1 = lv.point_t( { "x":CANVAS_WIDTH-1, "y":CANVAS_HEIGHT-1 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y} )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.x -= self.STEP
            if self.x < 0:
                self.state = 5
                self.x = 0
        elif self.state == 5:
            p1 = lv.point_t( { "x":CANVAS_WIDTH-1, "y":CANVAS_HEIGHT-1 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y} )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.y += self.STEP
            if self.y >= CANVAS_HEIGHT-1:
                self.state = 6
                self.y = CANVAS_HEIGHT-1
                self.x = CANVAS_WIDTH-1
        elif self.state == 6:
            p1 = lv.point_t( { "x":0, "y":CANVAS_HEIGHT-1 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y} )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.y -= self.STEP
            if self.y < 0:
                self.state = 7
                self.y = 0
        elif self.state == 7:
            p1 = lv.point_t( { "x":0, "y":CANVAS_HEIGHT-1 } )     
            p2 = lv.point_t( { "x":self.x, "y":self.y} )     
            self.canvas.draw_line([p1,p2],2,self.line_dsc)
            self.x -= self.STEP
            if self.x < 0:
                self.state = 0
                self.y = CANVAS_HEIGHT-1
                self.x = 0
        else:
            self.task.set_repeat_count(0);
            self.task = None

    def close(self):
        if self.task:
            self.task.set_repeat_count(0);
            self.task = None
       
    def __init__(self, page):
        self.cbuf = bytearray(CANVAS_WIDTH * CANVAS_HEIGHT * 4)

        # create a canvas
        self.canvas = lv.canvas(page, None)
        self.canvas.set_buffer(self.cbuf,CANVAS_WIDTH,CANVAS_HEIGHT,lv.img.CF.TRUE_COLOR)
        self.canvas.align(page,lv.ALIGN.CENTER,0,0)
        self.clear();

        # prepare line
        self.line_dsc = lv.draw_line_dsc_t()
        self.line_dsc.init()
        self.line_dsc.color = lv.color_hex(0xff0000);
        self.line_dsc.opa = lv.OPA.COVER

        self.color_state = (0,0)
        self.x = 0
        self.y = CANVAS_HEIGHT-1
        self.state = 0
        
        # the line drawing is done by a task so it doesn't interfere
        # with LVGL itself
        self.task = lv.task_create(self.line_task, 10, lv.TASK_PRIO.MID, None);

