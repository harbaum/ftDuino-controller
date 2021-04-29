// code.js

"use strict";

var Code = {};
Code.color_lvgl = 270
Code.color_llvgl = 0
Code.color_ftduino = 90
Code.color_misc = 60

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
var customBlocks = [
    {
	"type": "delay",
	"message0": "delay seconds %1",
	"args0": [ {
	    "type": "input_value",
	    "name": "TIME",
	    "check": "Number"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_misc
    }, {
	"type": "lists_contains",
	"message0": "%1 contains %2",
	"args0": [ {
	    "type": "input_value",
	    "name": "LIST",
	    "check": "Array"
	}, {
	    "type": "input_value",
	    "name": "VALUE"
	} ],
	"inputsInline": true,	
	"output": "Boolean",
	"colour": 260
    },

    // a simple start for non-graphics apps
    {
	"type": "start",
	"message0": "Start",
	"nextStatement": null,
	"colour": Code.color_misc
    },

    {
	"type": "mqtt_connect",
	"message0": "MQTT connect %1",
	"args0": [ {
	    "type": "field_input",
	    "name": "NAME",
	    "text": "mqtt_server"
	} ],
	"output": "Boolean",
	"colour": Code.color_misc
    }, {
	"type": "mqtt_disconnect",
	"message0": "MQTT disconnect",
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_misc
    }, {
	"type": "mqtt_publish",
	"message0": "MQTT publish %1 %2",
	"args0": [ {
	    "type": "field_input",
	    "name": "TOPIC",
	    "text": "topic"
	}, {
	    "type": "input_value",
	    "name": "MESSAGE",
	    "check": "String"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_misc
    }, {
	"type": "mqtt_subscribe",
	"message0": "MQTT subscribe %1 %2 on %3 %4",
	"args0": [ {
	    "type": "field_input",
	    "name": "TOPIC",
	    "text": "topic"
	}, {
	    "type": "input_dummy"
	}, {
	    "type": "field_variable",
	    "name": "MESSAGE",
	    "variable": "message"
	}, {
	    "type": "input_statement",
	    "name": "STATEMENTS"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_misc
    },
    
    // --------------- LLVGL ---------------
    {
	"type": "llvgl_window_set_title",
	"message0": "set window title %1 %2",
	"args0": [ {
	    "type": "field_colour",
	    "name": "COLOR",
	    "colour": "#0074d9"
	}, {
	    "type": "input_value",
	    "name": "TEXT",
	    "check": "String"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_window_set_background",
	"message0": "set window background %1",
	"args0": [
	    { "type": "field_colour",
	      "name": "COLOR",
	      "colour": "#f0f0f0"
	    } ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    },
    
    {
	"type": "llvgl_object",
	"message0": "new %1 type %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "type",
	    "options": [
		[ "Label",    "TYPE.LABEL"    ],
		[ "Button",   "TYPE.BUTTON"   ],
		[ "Switch",   "TYPE.SWITCH"   ],
		[ "Checkbox", "TYPE.CHECKBOX" ],
		[ "Dropdown", "TYPE.DROPDOWN" ],
		[ "Slider",   "TYPE.SLIDER"   ],
		[ "LED",      "TYPE.LED"      ],
		[ "Gauge",    "TYPE.GAUGE"    ],
		[ "Chart",    "TYPE.CHART"    ]
	    ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_set_text",
	"message0": "set %1 text %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "text",
	    "check": "String"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_set_colour",
	"message0": "set %1 colour %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "COLOUR",
	    "check": [ "Colour", "Array" ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_set_value",
	"message0": "set %1 value %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "VALUE",
	    "check": [ "Number", "Array", "Boolean" ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_get_value",
	"message0": "get %1 value",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	} ],
	"output": [ "Number", "Array", "Boolean" ],
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_coordinate",
	"message0": "%1/%2",
	"args0": [ {
	    "type": "input_value",
	    "name": "X"
	}, {
	    "type": "input_value",
	    "name": "Y"
	} ],
	"inputsInline": true,
	"output": "Array",
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_align",
	"message0": "place %1 %2 with offset %3",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "ALIGN",
	    "options": [ [ "centered",      "ALIGN.CENTER" ],
			 [ "top left",      "ALIGN.IN_TOP_LEFT" ],
			 [ "top middle",    "ALIGN.IN_TOP_MID" ],
			 [ "top right",     "ALIGN.IN_TOP_RIGHT" ],
			 [ "middle left",   "ALIGN.IN_LEFT_MID" ],
			 [ "middle right",  "ALIGN.IN_RIGHT_MID" ],
			 [ "botton left",   "ALIGN.IN_BOTTOM_LEFT" ],
			 [ "bottom middle", "ALIGN.IN_BOTTOM_MID" ],
			 [ "bottom right",  "ALIGN.IN_BOTTOM_RIGHT" ]
		       ]
	}, {
	    "type": "input_value",
	    "name": "COORDINATE",
	    "check": "Array"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_align_to",
	"message0": "place %1 %2 %3 with offset %4",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "ALIGN",
	    "options": [ [ "above",       "ALIGN.ABOVE"    ],
			 [ "below",       "ALIGN.BELOW"    ],
			 [ "left of",     "ALIGN.LEFT_OF"  ],
			 [ "right of",    "ALIGN.RIGHT_OF" ]
		       ]
	}, {
	    "type": "field_variable",
	    "name": "OTHER",
	    "variable": "other"
	}, {
	    "type": "input_value",
	    "name": "COORDINATE",
	    "check": "Number"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_set_size",
	"message0": "set %1 size %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "SIZE",
	    "check": "Array"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    },
    
    {
	"type": "llvgl_on_event",
	"message0": "on %1 %2 %3 %4",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "TYPE",
	    "options": [
		[ "clicked",       "EVENT.CLICKED" ],
		[ "pressed",       "EVENT.PRESSED" ],
		[ "released",      "EVENT.RELEASED" ],
		[ "value changed", "EVENT.VALUE_CHANGED" ]
	    ]
	}, {
	    "type": "input_dummy"
	}, {
	    "type": "input_statement",
	    "name": "STATEMENTS"
	} ],
	"colour": Code.color_llvgl
    }, {	
	"type": "llvgl_task",
	"message0": "every %1 seconds %2 do %3",
	"args0": [ {
	    "type": "field_number",
	    "name": "RATE",
	    "value": 1
	}, {
	    "type": "input_dummy"
	},  {
	    "type": "input_statement",
	    "name": "HANDLER"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_llvgl
    }, {
	"type": "llvgl_on_window_close",
	"message0": "on window close %1 %2",
	"args0": [ {
	    "type": "input_dummy"
	}, {
	    "type": "input_statement",
	    "name": "STATEMENTS"
	} ],
	"colour": Code.color_llvgl
    },
    
    {
	"type": "lvgl_page",
	"message0": "Page %1 %2 %3 %4",
	"args0": [ {
	    "type": "field_colour",
	    "name": "BGCOLOR",
	    "colour": "#dddddd"
	}, {
	    "type": "field_input",
	    "name": "TITLE",
	    "text": "title"
	}, {
	    "type": "input_dummy"
	}, {
	    "type": "input_statement",
	    "name": "CONTENT"
	} ],
	"colour": Code.color_lvgl,
	"tooltip": "A LVGL UI page"
    }, {
	"type": "lvgl_object",
	"message0": "new %1 type %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "type",
	    "options": [
		[ "Label",    "lv.label"    ],
		[ "Button",   "lv.btn"      ],
		[ "Switch",   "lv.switch"   ],
		[ "Checkbox", "lv.checkbox" ],
		[ "Slider",   "lv.slider"   ],
		[ "LED",      "lv.led"      ],
		[ "Gauge",    "lv.gauge"    ],
		[ "Chart",    "lv.chart"    ]
	    ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_text",
	"message0": "set %1 text %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "text",
	    "check": "String"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_align",
	"message0": "align %1 %2 %3",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "ALIGN",
	    "options": [ [ "centered",   "lv.ALIGN.CENTER" ],
			 [ "top left",   "lv.ALIGN.IN_TOP_LEFT" ],
			 [ "top middle", "lv.ALIGN.IN_TOP_MID" ],
			 [ "top right",  "lv.ALIGN.IN_TOP_RIGHT" ],
			 [ "middle left",   "lv.ALIGN.IN_LEFT_MID" ],
			 [ "middle right",  "lv.ALIGN.IN_RIGHT_MID" ],
			 [ "botton left",   "lv.ALIGN.IN_BOTTOM_LEFT" ],
			 [ "bottom middle", "lv.ALIGN.IN_BOTTOM_MID" ],
			 [ "bottom right",  "lv.ALIGN.IN_BOTTOM_RIGHT" ]

			 // OUT_BOTTOM_LEFT                 OUT_BOTTOM_MID
			 // OUT_BOTTOM_RIGHT                OUT_LEFT_BOTTOM
			 // OUT_LEFT_MID    OUT_LEFT_TOP    OUT_RIGHT_BOTTOM
			 // OUT_RIGHT_MID   OUT_RIGHT_TOP   OUT_TOP_LEFT    OUT_TOP_MID
			 // OUT_TOP_RIGHT
		       ]
	}, {
	    "type": "input_value",
	    "name": "COORDINATE",
	    "check": "Array"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_size",
	"message0": "set %1 size %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "SIZE",
	    "check": "Array"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_width",
	"message0": "set %1 width %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "WIDTH",
	    "check": "Number"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_on_event",
	"message0": "on %1 event %2 %3",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "input_dummy"
	}, {
	    "type": "input_statement",
	    "name": "handler"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_event",
	"message0": "event is %1",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "EVENT",
	    "options": [
		[ "clicked",       "lv.EVENT.CLICKED" ],
		[ "pressed",       "lv.EVENT.PRESSED" ],
		[ "released",      "lv.EVENT.RELEASED" ],
		[ "value changed", "lv.EVENT.VALUE_CHANGED" ]
	    ]
	} ],
	"output": "Boolean",
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_event_object",
	"message0": "event object",
	"output": null,
	"colour": Code.color_lvgl
    },{
	"type": "lvgl_coordinate",
	"message0": "%1/%2",
	"args0": [ {
	    "type": "input_value",
	    "name": "X"
	}, {
	    "type": "input_value",
	    "name": "Y"
	} ],
	"inputsInline": true,
	"output": "Array",
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_state",
	"message0": "set %1 state %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "VALUE",
	    "check": "Boolean"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_get_state",
	"message0": "get %1 state",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	} ],
	"output": "Boolean",
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_value",
	"message0": "set %1 value %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "VALUE",
	    "check": [ "Number", "Array", "Boolean" ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_get_value",
	"message0": "get %1 value",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	} ],
	"output": [ "Number", "Array", "Boolean" ],
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_set_colour",
	"message0": "set %1 colour %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "input_value",
	    "name": "COLOUR",
	    "check": [ "Colour", "Array" ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_task",
	"message0": "every %1 seconds %2 %3",
	"args0": [ {
	    "type": "field_number",
	    "name": "RATE",
	    "value": 1
	}, {
	    "type": "input_dummy"
	},  {
	    "type": "input_statement",
	    "name": "HANDLER"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_add_series",
	"message0": "add %1 %2 to chart %3",
	"args0": [ {
	    "type": "field_variable",
	    "name": "SERIES",
	    "variable": "series"
	}, {
	    "type": "field_colour",
	    "name": "COLOUR",
	    "colour": "#ff0000"
	}, {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    }, {
	"type": "lvgl_chart_set_type",
	"message0": "set %1 chart type %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "OBJECT",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "TYPE",
	    "options": [
		[ "lines",   "lv.chart.TYPE.LINE"   ],
		[ "columns", "lv.chart.TYPE.COLUMN" ]
	    ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_lvgl
    },
    
    {
	"type": "ftduino_i2c_scan",
	"message0": "scan I²C",
	"output": "Array",
	"colour": Code.color_ftduino
    }, {
	"type": "ftduino_set_addr",
	"message0": "set ftDuino address %1",
	"args0": [ {
	    "type": "input_value",
	    "name": "ADDRESS",
	    "check": "Number"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_ftduino
    }, {
	"type": "ftduino_output_mode",
	"message0": "set output %1 mode %2",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "PORT",
	    "options": [ [ "O1", "ftduino.OUTPUT_MODE.O1" ],
			 [ "O2", "ftduino.OUTPUT_MODE.O2" ],
			 [ "O3", "ftduino.OUTPUT_MODE.O3" ],
			 [ "O4", "ftduino.OUTPUT_MODE.O4" ],
			 [ "O5", "ftduino.OUTPUT_MODE.O5" ],
			 [ "O6", "ftduino.OUTPUT_MODE.O6" ],
			 [ "O7", "ftduino.OUTPUT_MODE.O7" ],
			 [ "O8", "ftduino.OUTPUT_MODE.O8" ] ]
	}, {
	    "type": "field_dropdown",
	    "name": "MODE",
	    "options": [ [ "OFF", "ftduino.OUTPUT_MODE.OFF" ],
			 [ "HI",  "ftduino.OUTPUT_MODE.HI"  ],
			 [ "LOW", "ftduino.OUTPUT_MODE.LOW" ] ]
	} ],	
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_ftduino
    }, {
	"type": "ftduino_output_value",
	"message0": "set output %1 value %2",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "PORT",
	    "options": [ [ "O1", "ftduino.OUTPUT_VALUE.O1" ],
			 [ "O2", "ftduino.OUTPUT_VALUE.O2" ],
			 [ "O3", "ftduino.OUTPUT_VALUE.O3" ],
			 [ "O4", "ftduino.OUTPUT_VALUE.O4" ],
			 [ "O5", "ftduino.OUTPUT_VALUE.O5" ],
			 [ "O6", "ftduino.OUTPUT_VALUE.O6" ],
			 [ "O7", "ftduino.OUTPUT_VALUE.O7" ],
			 [ "O8", "ftduino.OUTPUT_VALUE.O8" ] ]	    
	}, {
	    "type": "input_value",
	    "name": "VALUE",
	    "check": "Number"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_ftduino
    }, {
	"type": "ftduino_input_mode",
	"message0": "set input %1 mode %2",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "PORT",
	    "options": [ [ "I1", "ftduino.INPUT_MODE.I1" ],
			 [ "I2", "ftduino.INPUT_MODE.I2" ],
			 [ "I3", "ftduino.INPUT_MODE.I3" ],
			 [ "I4", "ftduino.INPUT_MODE.I4" ],
			 [ "I5", "ftduino.INPUT_MODE.I5" ],
			 [ "I6", "ftduino.INPUT_MODE.I6" ],
			 [ "I7", "ftduino.INPUT_MODE.I7" ],
			 [ "I8", "ftduino.INPUT_MODE.I8" ] ]
	}, {
	    "type": "field_dropdown",
	    "name": "MODE",
	    "options": [ [ "Voltage",     "ftduino.INPUT_MODE.U" ],
			 [ "Resistance",  "ftduino.INPUT_MODE.R" ],
			 [ "Switch",      "ftduino.INPUT_MODE.SW" ] ]
	} ],	
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_ftduino
    }, {
	"type": "ftduino_input_value",
	"message0": "get input %1",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "PORT",
	    "options": [ [ "I1", "ftduino.INPUT_VALUE.I1" ],
			 [ "I2", "ftduino.INPUT_VALUE.I2" ],
			 [ "I3", "ftduino.INPUT_VALUE.I3" ],
			 [ "I4", "ftduino.INPUT_VALUE.I4" ],
			 [ "I5", "ftduino.INPUT_VALUE.I5" ],
			 [ "I6", "ftduino.INPUT_VALUE.I6" ],
			 [ "I7", "ftduino.INPUT_VALUE.I7" ],
			 [ "I8", "ftduino.INPUT_VALUE.I8" ] ]
        } ],
	"output": "Number",
	"colour": Code.color_ftduino
    }, {
	"type": "i2c_write",
	"message0": "I²C write A:%1 R:%2 %3 %4",
	"args0": [ {
	    "type": "field_number",
	    "name": "ADDR",
	    "value": 42
	}, {
	    "type": "field_number",
	    "name": "REG",
	    "value": 0
	}, {
	    "type": "field_dropdown",
	    "name": "TYPE",
	    "options": [ [ "byte",               "ftduino.I2C_TYPE.BYTE"    ],
			 [ "16 bit (lsb first)", "ftduino.I2C_TYPE.INT16LE" ],
			 [ "32 bit (lsb first)", "ftduino.I2C_TYPE.INT32LE" ],
			 [ "16 bit (msb first)", "ftduino.I2C_TYPE.INT16BE" ],
			 [ "32 bit (msb first)", "ftduino.I2C_TYPE.INT32BE" ]
		       ]
	}, {
	    "type": "input_value",
	    "name": "VALUE"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": Code.color_ftduino
    }, {
	"type": "i2c_read",
	"message0": "I²C read A:%1 R:%2 %3 #%4",
	"args0": [ {
	    "type": "field_number",
	    "name": "ADDR",
	    "value": 42
	}, {
	    "type": "field_number",
	    "name": "REG",
	    "value": 0
	}, {
	    "type": "field_dropdown",
	    "name": "TYPE",
	    "options": [ [ "byte",               "ftduino.I2C_TYPE.BYTE"    ],
			 [ "16 bit (lsb first)", "ftduino.I2C_TYPE.INT16LE" ],
			 [ "32 bit (lsb first)", "ftduino.I2C_TYPE.INT32LE" ],
			 [ "16 bit (msb first)", "ftduino.I2C_TYPE.INT16BE" ],
			 [ "32 bit (msb first)", "ftduino.I2C_TYPE.INT32BE" ]
		       ]
	}, {
	    "type": "field_number",
	    "name": "NUM",
	    "value": 1
	} ],
	"output": null,
	"colour": Code.color_ftduino
    }
]

function loadToolbox() {
    var http = new XMLHttpRequest();
    http.open("GET", "blockly/toolbox.xml");
    http.setRequestHeader("Content-type", "application/xml");
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            if (http.status == 200)
		toolbox_install(http.responseText);
	}
    }
    http.send();
}

function prepend_lines(str, prefix) {
    var result = "";    
    var lines = str.split(/\r\n|\r|\n/);
    lines.forEach(l => { result += prefix + l + "\n"; });
    return result;
}

function getGlobal(block, prefix, skip) {
    // all variables are global in blockly
    var usedVars = Blockly.Variables.allUsedVarModels(block.workspace);
    var devVars = Blockly.Variables.allDeveloperVariables(block.workspace);

    if(!usedVars.length && !devVars.length) return "";

    // start with user variables
    var globals = []
    usedVars.forEach(v => {
	var name = Blockly.Python.variableDB_.getName(v["name"],
			  Blockly.VARIABLE_CATEGORY_NAME);
	
	if(!skip || !skip.includes(name)) 
	    globals.push(name);
    });

    // Add developer variables.
    devVars.forEach(v => {
	globals.push(Blockly.Python.variableDB_.getName(v,
			Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    });

    if(!globals.length)
	return "";
    
    return prefix + "global " + globals.join(', ') + "\n";
}

//function llvgl_object_type_validator(newValue) {
//    this.getSourceBlock().updateValue(newValue);
//    return newValue;
//}

function toolbox_install(toolboxText) {
    var toolbox = Blockly.Xml.textToDom(toolboxText);

    customBlocks.forEach(b => {    
	Blockly.Blocks[b["type"]] = {
	    init: function() { this.jsonInit(b); } };
	
	// ftduino_ methods create a developer variable to hold the bus reference
	if(b["type"].startsWith("ftduino_"))
	    Blockly.Blocks[b["type"]]["getDeveloperVars"] =
	    function() {
		if(Code.workspace.getBlocksByType('ftduino_set_addr', false).length > 0)
		    return ['i2cBus', 'ftduinoAddress' ];

		return [ 'i2cBus' ];
	    }
	
	if(b["type"].startsWith("i2c_"))
	    Blockly.Blocks[b["type"]]["getDeveloperVars"] =
	    function() { return ['i2cBus' ]; }
	
	if(b["type"].startsWith("lvgl_page"))
	    Blockly.Blocks[b["type"]]["getDeveloperVars"] =
	    function() { return ['page' ]; }
	    
	if(b["type"].startsWith("lvgl_task"))
	    Blockly.Blocks[b["type"]]["getDeveloperVars"] =
	    function() { return ['tasks' ]; }

	// https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/dropdown

	// special handler for llvgl object to add an input for the label
	// if(b["type"] == "llvgl_object") {
	//     Blockly.Blocks[b["type"]] = {
	// 	init: function() {
	// 	    this.jsonInit(b);
	// 	    this.getField('type').setValidator(llvgl_object_type_validator);
	// 	},
		
	// 	updateValue: function(newValue) {
	// 	    // this.getInput('VALUE');
		    
	// 	    this.removeInput('VALUE', /* no error */ true);
	// 	    if (newValue == 'TYPE.LABEL') {
	// 	    	this.appendValueInput('VALUE');
	// 		console.log("With input:", this);
	// 	    }

	// 	    console.log("len:", this.inputList.length);
	// 	    if(this.inputList.length) {
	// 	    }
		    
	// 	}
	//     };
	// }	
    });

    Code.workspace = Blockly.inject('blocklyDiv',
				    { media: './blockly/media/',
				      toolbox: toolbox,
				      // scrollbars: false,
				      zoom: { // controls: true,
					  wheel: true,
					  // startScale: 1.0,
					  maxScale: 2,
					  minScale: 0.5,
					  scaleSpeed: 1.1
				      },
				      theme: Blockly.Theme.defineTheme('themeHat', {
					  'base': Blockly.Themes.Classic,
					  'startHats': true
				      })
				    });

    Code.workspace.addChangeListener(Blockly.Events.disableOrphans);
    // Code.workspace.setTheme(theme).
	
    // -------- test ability to show and hide the toolbox ------------
/*
    var tbDiv = document.getElementsByClassName("blocklyToolboxDiv")[0];
    var node = document.createElement("Button");
    node.onclick = function() {
	tbDiv.style.display = "none";
    };
    var textnode = document.createTextNode("Hide");
    node.appendChild(textnode);       
    tbDiv.appendChild(node);
*/    
    parseUrl("xml", function(name, code) {
	// set project name in input field and set text into editor
	if(name) document.getElementById("project").value = name;
	if(code) {
	    var xml = Blockly.Xml.textToDom(code);
	    Blockly.Xml.domToWorkspace(xml, Code.workspace);
	} else {
	    if(!name) name = "My project";
	    
	    // no code given, start with minimum program
	    var xml =
		'<xml>' +
		'<block type="start" deletable="false" movable="false">' +
		'  <next>' +
		'    <block type="llvgl_window_set_title">' +
		'      <value name="TEXT">' + 
		'        <block type="text">' +
		'           <field name="TEXT">'+name+'</field>' +
		'        </block>' +
		'      </value>' +
		'      <next>' +
		'        <block type="llvgl_window_set_background"></block>' +
		'      </next>' +
		'    </block>' +
		'  </next>' +
		'</block>' +
		'</xml>';
	    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Code.workspace);	    
	}
	set_status(status.success, "Blockly "+Blockly.VERSION);
    });

    // micropython does not come with Numbers, so overwrite the generator    
    Blockly.Python['math_change'] = function(block) {
	var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
						   Blockly.Python.ORDER_ADDITIVE) || '0';
	var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
							 Blockly.VARIABLE_CATEGORY_NAME);
	return varName + ' = ' + varName + ' + ' + argument0 + '\n';
    };
    
    /****************************************************************/
    /********************          LVGL        **********************/
    /****************************************************************/

    function parse_coordinate(coo_str) {
	var c = [];
	if(coo_str == "") { coo_str = "[ 0, 0 ]"; }
	
	// coo_str may be an array or a variable holding an array
	// TODO: This is not perfect and would fail if there are additional comma within
	// the coo_str. But this is quite unlikely to occur
	if(coo_str.trim().startsWith("[") && coo_str.trim().endsWith("]")) {
	    var value = coo_str.trim();
	    var coos = value.substring(1,value.length-1).split(",")
	    c[0] = coos[0].trim();
	    if(coos.length < 2) c[1] = "0";
	    else                c[1] = coos[1].trim();
	} else {
	    c[0] = coo_str+"[0]";
	    c[1] = coo_str+"[1]";
	}
	return c;
    }
    
    function lvgl_prepare(needsColor, needsSeries) {
	var tasksVar = Blockly.Python.variableDB_.getName('tasks', Blockly.Names.DEVELOPER_VARIABLE_TYPE);	
	var vars = Blockly.Python.definitions_['variables'].split("\n");
	var new_vars = [ ]
	vars.forEach(v => {	    	    
	    switch(v.split("=")[0].trim()) {
	    case tasksVar:
		v = tasksVar + " = []";
		break;
	    }
	    new_vars.push(v);
	});

	var retval = { tasks: tasksVar };
	
	if(needsSeries) {
	    retval["series"] = Blockly.Python.provideFunction_(
		'lvgl_series',
		[ "class " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + ":",
		  "  def __init__(self, __chart, __color):",
		  "    self.chart = __chart",
		  "    self.series = self.chart.add_series(__color)",
		  "  def set_values(self, __values):",
		  "    for __i in range(len(__values)):",
		  "      __values[__i] = int(__values[__i])",
		  "    self.chart.set_points(self.series, __values);"
		] );
	}
	    
	if(needsColor) {
	    retval["color"] = Blockly.Python.provideFunction_(
	    'lvgl_colour',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(colour):',
	      "  return lv.color_hex(int(colour[1:], 16))" ])
	}

	Blockly.Python.definitions_['variables'] = new_vars.join('\n');
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";

	return retval;
    }
    
    Blockly.Python['lvgl_page'] = function(block) {
	var vars = lvgl_prepare(true, false);
	
	var colour_bg = block.getFieldValue('BGCOLOR');
	var title = block.getFieldValue('TITLE');
	var statements = Blockly.Python.statementToCode(block, 'CONTENT');

	// Indent all statements one more level
	statements = prepend_lines(statements, "    ");
	
	if(colour_bg) {
	    /* add bg set */
	    statements =
		"        # set background color\n" +
		"        bg_style = lv.style_t();\n" +
		"        bg_style.set_bg_opa(lv.STATE.DEFAULT, lv.OPA.COVER);\n" +
		"        bg_style.set_bg_color(lv.STATE.DEFAULT, "+vars["color"]+"('"+colour_bg+"'));\n" +
		"        page.add_style(lv.obj.PART.MAIN, bg_style);\n\n" +
		statements;
	}
	    
	// handle (useless) empty page
	if(statements == "") statements = "        pass\n";
	
	var code = "class Page:\n";
	if(title != "") {
	    code += "    # name to be used in window title\n"
	    code += "    def title():\n"
            code += "        return \""+ title+"\";\n\n";    
	}

	// check if the developer variables now contain "tasks". That would
	// mean that the user has used tasks and we need to clean them up
	var found = false;
	var tasksVar = Blockly.Python.variableDB_.getName('tasks', Blockly.Names.DEVELOPER_VARIABLE_TYPE);	
	var vars = Blockly.Python.definitions_['variables'].split("\n");
	vars.forEach(v => {	    	    
	    if(v.split("=")[0].trim() == tasksVar)
		found = true;
	});
	if(found) {
	    code += "    # close is being called by the ftDuino32 when\n"
	    code += "    # the page is being closed by the user\n"
	    code += "    def close(self):\n" + getGlobal(block, "        ")
	    code += "        # cleaning up tasks\n"
	    code += "        for t in "+tasksVar+":\n"
	    code += "            t.set_repeat_count(0);\n"
	    code += "        "+tasksVar+" = None\n"
	    code += "\n"
	}
	
	code +=
	    "    def __init__(self, __page):\n" +
	    getGlobal(block, "        ") +
	    "        page = __page\n"
	
	return code + statements;
    };

    // tell generator about our custom blocks
    Blockly.Python['lvgl_object'] = function(block) {
	lvgl_prepare(false, false);
	var variable_obj = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_type = block.getFieldValue('type');
	var code = variable_obj + " = " + dropdown_type + "(page);\n";
	return code;
    };

    Blockly.Python['lvgl_set_text'] = function(block) {
	lvgl_prepare(false, false);
	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_set_text',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(obj, str):',
	      "  if isinstance(obj, lv.label) or isinstance(obj, lv.checkbox):", 
              "    obj.set_text(str);", 
	      "  elif isinstance(obj, lv.btn):",
              "    label = lv.label(obj)",
              "    label.set_text(str);" ]);
	
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
	
	var code = functionName + "("+ variable_object + ", " + value_text + ");\n";
	return code;
    };

    Blockly.Python['lvgl_set_state'] = function(block) {
	lvgl_prepare(false, false);
	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_set_state',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(obj, state):',
	      "  if isinstance(obj, lv.checkbox):", 
              "    obj.set_checked(state);", 
	      "  elif isinstance(__obj, lv.led):",
	      "    if __value: __obj.on()",
	      "    else:       __obj.off()",
	      "  elif isinstance(obj, lv.switch):",
	      "    if state: obj.on(lv.ANIM.OFF)",
	      "    else:     obj.off(lv.ANIM.OFF)" ]);

	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = functionName + "("+ variable_object + ", " + value_value + ");\n";
	return code;
    };
    
    Blockly.Python['lvgl_get_state'] = function(block) {
	lvgl_prepare(false, false);
	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_get_state',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(obj):',
	      "  if isinstance(obj, lv.checkbox):", 
              "    return obj.is_checked()", 
	      "  elif isinstance(obj, lv.switch):",
	      "    return obj.get_state()",
	      "  return False" ]);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var code = functionName + "("+ variable_object +")";
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };
    
    Blockly.Python['lvgl_align'] = function(block) {
	lvgl_prepare(false, false);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_align = block.getFieldValue('ALIGN');
	var value_coordinate = Blockly.Python.valueToCode(block, 'COORDINATE', Blockly.Python.ORDER_ATOMIC);
	var c = parse_coordinate(value_coordinate);
	var code = variable_object+".align(page, " + dropdown_align + ", " + c[0] + ", " + c[1] + ");\n";
	return code;
    };

    Blockly.Python['lvgl_set_size'] = function(block) {
	lvgl_prepare(false, false);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC);
	var c = parse_coordinate(value_size);
	var code = variable_object+".set_size(" + c[0] + ", " + c[1] + ");\n";
	return code;
    };
    
    Blockly.Python['lvgl_set_width'] = function(block) {
	lvgl_prepare(false, false);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC);
	var code = variable_object+".set_width(" + value_width + ");\n";
	return code;
    };
    
    Blockly.Python['lvgl_on_event'] = function(block) {
	lvgl_prepare(false, false);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var statements_handler = Blockly.Python.statementToCode(block, 'handler');

	if(statements_handler == "") return "";

	// todo: make function name unique and perhaps the function global
	var code = "def on_event(__obj, __evt):\n" + getGlobal(block, "    ") + statements_handler +
	    "\n" + variable_object + ".set_event_cb(on_event)\n";
	    
	return code;
    };

    Blockly.Python['lvgl_event'] = function(block) {
	lvgl_prepare(false, false);
	var dropdown_event = block.getFieldValue('EVENT');
	var code = "__evt == " + dropdown_event;
	return [code, Blockly.Python.ORDER_NONE];
    };
    
    Blockly.Python['lvgl_event_object'] = function(block) {
	lvgl_prepare(false, false);
	var code = "__obj";
	return [code, Blockly.Python.ORDER_NONE];
    };
    
    Blockly.Python['lvgl_set_value'] = function(block) {
	var vars = lvgl_prepare(false, true);
	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_set_value',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(__obj, __value):',
	      // TODO: This can completely replace set_state
	      "  if isinstance(__obj, lv.checkbox):", 
              "    __obj.set_checked(__value);", 
	      "  elif isinstance(__obj, lv.switch):",
	      "    if __value: __obj.on(lv.ANIM.OFF)",
	      "    else:       __obj.off(lv.ANIM.OFF)",
	      "  elif isinstance(__obj, lv.led):",
	      "    if __value: __obj.on()",
	      "    else:       __obj.off()",
	      "  elif isinstance(__obj, lv.slider):",
	      "    __obj.set_value(__value, lv.ANIM.OFF);", 
	      "  elif isinstance(__obj,"+vars['series']+"):",
	      "    __obj.set_values(__value);",
	      "  elif isinstance(__obj, lv.gauge):",
	      "    # gauge takes single value or array",
	      "    try:     __num = len(__value)",
	      "    except:  __num = None",
	      "    if not __num:",
	      "      # no array: just set a single value",
	      "      __obj.set_value(0, int(__value))",
	      "    else:",
	      "      for __i in range(__num):",
	      "        __obj.set_value(__i, int(__value[__i]))"
	    ]);
	
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = functionName + "("+variable_object+","+value_value+")\n";
	return code;
    };

    Blockly.Python['lvgl_get_value'] = function(block) {
	lvgl_prepare(false, false);
	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_get_value',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(__obj):',
	      "  if isinstance(__obj, lv.checkbox):", 
              "    return __obj.is_checked();", 
	      "  elif isinstance(__obj, lv.switch):",
	      "    return __obj.get_state()",
	      "  elif isinstance(__obj, lv.slider):",
	      "    return __obj.get_value();", 
	      "  return None"
	    ]);
	
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var code = functionName + "("+variable_object+")";
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };
    
    Blockly.Python['lvgl_set_colour'] = function(block) {
	var vars = lvgl_prepare(true, false);

	var functionName = Blockly.Python.provideFunction_(
	    'lvgl_set_colour',
	    [ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(obj, colour):',
	      "  if isinstance(obj, lv.label):",
	      "    obj.set_style_local_text_color(lv.btn.PART.MAIN, lv.STATE.DEFAULT, "+ vars["color"] + "(colour))",
	      "  elif isinstance(obj, lv.slider):",
	      "    style = lv.style_t()",
	      "    style.init()",
	      "    style.set_bg_color(lv.STATE.DEFAULT, "+ vars["color"]+"(colour))",
	      "    obj.add_style(lv.slider.PART.KNOB, style)",
	      "    obj.add_style(lv.slider.PART.INDIC, style)",
	      "  elif isinstance(obj, lv.led):",
	      "    style = lv.style_t()",
	      "    style.init()",
	      "    style.set_bg_color(lv.STATE.DEFAULT, "+ vars["color"]+"(colour))",
	      "    style.set_border_color(lv.STATE.DEFAULT, lv.color_t.color_lighten("+ vars["color"]+"(colour), lv.OPA._30))",
	      "    style.set_shadow_color(lv.STATE.DEFAULT, "+ vars["color"]+"(colour))",
	      "    obj.add_style(lv.led.PART.MAIN, style)",	      
	      "  elif isinstance(obj, lv.gauge):", 
	      "    # gauge takes single colour or array",
	      "    try:     __num = len(colour)",
	      "    except:  __num = None",
	      "    if not __num:",
	      "      # no array, just a single colour",
	      "      obj.set_needle_count(1, "+vars["color"]+"(colour))",
	      "    else:",
	      "      __colarr = []",
	      "      for __c in colour:",
	      "         __colarr.append("+vars["color"]+"(__c))",
	      "      obj.set_needle_count(__num, __colarr)",
	    ]);
	      
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC);
	var code = functionName + "("+variable_object+","+value_colour+")\n";
	return code;
    };
    
    Blockly.Python['lvgl_coordinate'] = function(block) {
	lvgl_prepare(false, false);
	var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE);
	var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE);
	var code = "[" + value_x + ", " + value_y + "]";
	return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['lvgl_task'] = function(block) {
	var vars = lvgl_prepare(false, false);
	// we need a variable to keep track of running handlers to be able to stop
	// them when the page is being closed
	var tasksVar = Blockly.Python.variableDB_.getName('tasks', Blockly.Names.DEVELOPER_VARIABLE_TYPE);
	
	var number_rate = block.getFieldValue('RATE');
	var statements_handler = Blockly.Python.statementToCode(block, 'HANDLER');
	var code = "def _task(__parm):\n" + getGlobal(block, "    ") +
	    "    # don't run if tasks have been stopped\n" + 
	    "    if not " + vars["tasks"] + ": return\n" + statements_handler +
	    vars["tasks"] + ".append(lv.task_create(_task, " + Math.round(number_rate*1000) + ", lv.TASK_PRIO.MID, None));\n";
	return code;
    };
    
    Blockly.Python['lvgl_add_series'] = function(block) {
	var vars = lvgl_prepare(true, true);
	
	var variable_series = Blockly.Python.variableDB_.getName(block.getFieldValue('SERIES'), Blockly.Variables.NAME_TYPE);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var colour_colour = block.getFieldValue('COLOUR');
	var code = variable_series + " = " + vars["series"] + "("+variable_object + ", " + vars["color"] + "('"+colour_colour+"'))\n";
	return code;
    };

    Blockly.Python['lvgl_chart_set_type'] = function(block) {
	lvgl_prepare(true, false);
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var dropdown_type = block.getFieldValue('TYPE');
	var code = variable_object + ".set_type("+dropdown_type+")\n";
	return code;
    };
    
    /****************************************************************/
    /********************         llvgl        **********************/
    /****************************************************************/

    const event_name_map = {
	"EVENT.CLICKED": "clicked",
	"EVENT.PRESSED": "pressed",
	"EVENT.RELEASED": "released",
	"EVENT.VALUE_CHANGED": "value_changed"
    };

    Blockly.Python['llvgl_window_set_title'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var colour = block.getFieldValue('COLOR');
	var value_text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
	return 'window_set_title(' +value_text+', "'+colour+'")\n';
    };

    Blockly.Python['llvgl_window_set_background'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var colour = block.getFieldValue('COLOR');
	return 'window_set_content_color("'+colour+'")\n';
    };
    
    // tell generator about our custom blocks
    Blockly.Python['llvgl_object'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_obj = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_type = block.getFieldValue('type');
	var code = variable_obj + " = widget_new(" + dropdown_type + ");\n";

	// find all event blocks related to this object
	Code.workspace.getTopBlocks().forEach(b => {
	    if(b.type == "llvgl_on_event") {
		var object = Blockly.Python.variableDB_.getName(
		    b.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
		if(object == variable_obj) {
		    var type = b.getFieldValue('TYPE');
		    code += "widget_set_event_handler(" +
			object + ", " + type + ", " + "on_" + object + "_" + event_name_map[type] + ")\n";
		}
	    }
	});
	
	return code;
    };

    Blockly.Python['llvgl_align'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_align = block.getFieldValue('ALIGN');
	var value_coordinate = Blockly.Python.valueToCode(block, 'COORDINATE', Blockly.Python.ORDER_ATOMIC);
	var c = parse_coordinate(value_coordinate);
	return "widget_set_align("+variable_object+", None, " + dropdown_align + ", " + c[0] + ", " + c[1] + ");\n";
    };

    Blockly.Python['llvgl_align_to'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var variable_ref = Blockly.Python.variableDB_.getName(block.getFieldValue('OTHER'), Blockly.Variables.NAME_TYPE);
	var dropdown_align = block.getFieldValue('ALIGN');
	var value_coordinate = Blockly.Python.valueToCode(block, 'COORDINATE', Blockly.Python.ORDER_ATOMIC);
	return "widget_set_align("+variable_object+", "+variable_ref+", " + dropdown_align + ", " + value_coordinate + ");\n";
    };
    
    Blockly.Python['llvgl_set_size'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC);
	var c = parse_coordinate(value_size);
	return "widget_set_size("+variable_object+", " + c[0] + ", " + c[1] + ");\n";
    };
    
    // the code generation for this is a little special as we need the function definitions
    // always to appear before the actual code. So we store them as part of the definitions
    Blockly.Python['llvgl_on_event'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var object = Blockly.Python.variableDB_.getName(
	    block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var type = block.getFieldValue('TYPE');
	var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');

	var code = "def on_" + object + "_" + event_name_map[type] +
	    "("+object+",_e):\n"+getGlobal(block, "    ", object)+statements + '\n';

	Blockly.Python.definitions_["on_" + object + "_" + event_name_map[type]] = code;
	
	return "";
    };

    Blockly.Python['llvgl_on_window_close'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
	var code = "def on_window_close():\n"+getGlobal(block, "    ")+statements + '\n' +
	    'window_on_close(on_window_close)\n';
	return code;
    };

    Blockly.Python['llvgl_set_text'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);	
	return "widget_set_text("+ variable_object + ", " + value_text + ");\n";
    };

    Blockly.Python['llvgl_set_colour'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC);
	return "widget_set_colour("+variable_object+","+value_colour+");\n";
    };
    
    Blockly.Python['llvgl_set_value'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	return "widget_set_value("+variable_object+","+value_value+")\n";
    };

    Blockly.Python['llvgl_get_value'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('OBJECT'), Blockly.Variables.NAME_TYPE);
	var code = "widget_get_value("+variable_object+")";
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['llvgl_coordinate'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE);
	var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE);
	var code = "[" + value_x + ", " + value_y + "]";
	return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['llvgl_task'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var number_rate = block.getFieldValue('RATE');
	var statements = Blockly.Python.statementToCode(block, 'HANDLER');
	if(statements == "") statements = "    pass\n";

	var code = "def __llvgl_task_"+Code.task_counter+"(__timer):\n" +
	    getGlobal(block, "    ") + statements + "\n"+
	    "timer_start("+number_rate+", __llvgl_task_"+Code.task_counter+");\n";

	Code.task_counter++;
	
	return code;
    };
    
    /****************************************************************/
    /********************        ftDuino       **********************/
    /****************************************************************/

    function ftduino_prepare(block) {
	// make sure the i2c variables have the correct defaults
	var busVar = Blockly.Python.variableDB_.getName('i2cBus', Blockly.Names.DEVELOPER_VARIABLE_TYPE);

	// check if there's a "set address" block being used.
	if(Code.workspace.getBlocksByType('ftduino_set_addr', false).length > 0)
	    var addrVar = Blockly.Python.variableDB_.getName('ftduinoAddress', Blockly.Names.DEVELOPER_VARIABLE_TYPE);
	else
	    var addrVar = 43;
	
	// Update the bus and address variable definition if present. Presetting variables with
	// None is hardcoded into the python generator
	var vars = Blockly.Python.definitions_['variables'].split("\n");
	var new_vars = [ ]
	vars.forEach(v => {	    	    
	    switch(v.split("=")[0].trim()) {
	    case busVar:
		v = busVar + " = I2C(0,scl=Pin(22),sda=Pin(21))";
		break;
	    case addrVar:
		v = addrVar + " = 43 # default i2c client address";
		break;
	    }
	    new_vars.push(v);
	});
	
	Blockly.Python.definitions_['variables'] = new_vars.join('\n');
	Blockly.Python.definitions_['import ftduino'] = "import ftduino";
	Blockly.Python.definitions_['from_machine_import_Pin_I2C'] = "from machine import Pin, I2C";

	var retval = { bus: busVar, addr: addrVar };	
	return retval;
    }
    
    Blockly.Python['ftduino_i2c_scan'] = function(block) {
	var vars = ftduino_prepare(block)
	var code = vars["bus"]+".scan()"
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['ftduino_set_addr'] = function(block) {
	var vars = ftduino_prepare(block)
	var value_address = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
	var code = vars["addr"] + " = " + value_address + "\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_mode'] = function(block) {
	var vars = ftduino_prepare(block)	
	var dropdown_port = block.getFieldValue('PORT');
	var dropdown_mode = block.getFieldValue('MODE');
	var code = "ftduino.i2c_write("+ vars["bus"] + ", " + vars["addr"] + ", " + dropdown_port + ', ftduino.I2C_TYPE.BYTE, ' + dropdown_mode+")\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_value'] = function(block) {
	var vars = ftduino_prepare(block)	
	var dropdown_port = block.getFieldValue('PORT');
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = "ftduino.i2c_write("+ vars["bus"] + ", " + vars["addr"] + ", " + dropdown_port + ', ftduino.I2C_TYPE.BYTE, ' + value_value+")\n";
	return code;
    };

    Blockly.Python['ftduino_input_mode'] = function(block) {
	var vars = ftduino_prepare(block)
	var dropdown_port = block.getFieldValue('PORT');
	var dropdown_mode = block.getFieldValue('MODE');
	var code = "ftduino.i2c_write("+ vars["bus"] + ", " + vars["addr"] + ", " + dropdown_port + ', ftduino.I2C_TYPE.BYTE, ' + dropdown_mode+")\n";
	return code;
    };
    
    Blockly.Python['ftduino_input_value'] = function(block) {
	var vars = ftduino_prepare(block)	
	var dropdown_port = block.getFieldValue('PORT');
	var code = "ftduino.i2c_read("+ vars["bus"] + ", " + vars["addr"] + ", " + dropdown_port + ", ftduino.I2C_TYPE.INT16LE, 1)";
	return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['i2c_write'] = function(block) {
	var vars = ftduino_prepare(block)
	var addr = block.getFieldValue('ADDR');
	var reg = block.getFieldValue('REG');
	var type = block.getFieldValue('TYPE');
	var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = "ftduino.i2c_write("+vars["bus"]+", "+addr+", "+reg+", "+type+", "+value+")\n";
	return code;
    };
    
    Blockly.Python['i2c_read'] = function(block) {
	var vars = ftduino_prepare(block)
	var addr = block.getFieldValue('ADDR');
	var reg = block.getFieldValue('REG');
	var type = block.getFieldValue('TYPE');
	var num = block.getFieldValue('NUM');
	var code = "ftduino.i2c_read("+vars["bus"]+", "+addr+", "+reg+", "+type+", "+num+")";
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };
    
    /****************************************************************/
    /********************          misc        **********************/
    /****************************************************************/

    Blockly.Python['start'] = function(block) {
	return "";
    };
    
    Blockly.Python['delay'] = function(block) {
	Blockly.Python.definitions_['import_utime'] = "import utime";
	var time_value = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC);
	var code = "utime.sleep("+ time_value +")\n";
	return code;
    };

    Blockly.Python['lists_contains'] = function(block) {
	var value_list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_ATOMIC);
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = value_value + " in " + value_list;
	return [code, Blockly.Python.ORDER_NONE];
    };

    /****************************************************************/
    /********************          mqtt        **********************/
    /****************************************************************/

    Blockly.Python['mqtt_connect'] = function(block) {
	Blockly.Python.definitions_['from mqtt import mqtt'] = "from mqtt import mqtt";
	var name = block.getFieldValue('NAME');
	var code = 'mqtt.connect("' + name + '")';
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };
    
    Blockly.Python['mqtt_disconnect'] = function(block) {
	Blockly.Python.definitions_['from mqtt import mqtt'] = "from mqtt import mqtt";
	return "mqtt.disconnect()\n";
    };
    
    Blockly.Python['mqtt_publish'] = function(block) {
	Blockly.Python.definitions_['from mqtt import mqtt'] = "from mqtt import mqtt";
	var topic = block.getFieldValue('TOPIC');
	var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
	var code = "mqtt.publish('"+topic+"', "+message+")\n";
	return code;
    };

    Blockly.Python['mqtt_subscribe'] = function(block) {
	Blockly.Python.definitions_['from mqtt import mqtt'] = "from mqtt import mqtt";
	var topic = block.getFieldValue('TOPIC');
	var message = Blockly.Python.variableDB_.getName(block.getFieldValue('MESSAGE'), Blockly.Variables.NAME_TYPE);
	var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
	var code = "def on_mqtt_" + topic + 
	    "("+message+"):\n"+getGlobal(block, "    ", message)+statements + '\n';

	Blockly.Python.definitions_["on_mqtt_"+topic] = code;
	
	return "mqtt.subscribe('"+topic+"', on_mqtt_"+topic+")\n";
    };
    
    // Python should be indented by 4 spaces
    Blockly.Python.INDENT = "    ";
}

function init() {
    // once the toolbox is loaded blockly will be instanciated
    loadToolbox();
}

function formatXml(xml) {
    var formatted = '', indent= '';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(2);  // decrease indent
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += "  ";              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}

function upload() {
    var project = document.getElementById("project").value;
    if(!project) project = document.getElementById("project").placeholder;
    if(!project) {
	set_status(status.error, "No project name given");
	return;
    }

    Code.task_counter = 0;  // restart task count
    var python_code = Blockly.Python.workspaceToCode(Code.workspace);

    // if the workspace contains llvgl as well as mqtt, then close the
    // connection when window is being closed
    // TODO ...
    
    // generate xml to post it with the python code
    var blockly_dom = Blockly.Xml.workspaceToDom(Code.workspace);
    var blockly_code = Blockly.Xml.domToText(blockly_dom);
    
    // don't actually post on localhost
    if(document.location.hostname == "localhost") {
	console.log("Blockly code:");
	console.log(formatXml(blockly_code));
	console.log("Python code:");
	console.log(python_code);
	return;
    }

    post("blockly", [ { "filename": project+".py",  "data": python_code },
		      { "filename": project+".xml", "data": blockly_code } ])
}

window.addEventListener('load', init);
