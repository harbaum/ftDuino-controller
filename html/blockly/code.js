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
    },{
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
	"message0": "on window closed %1 %2",
	"args0": [ {
	    "type": "input_dummy"
	}, {
	    "type": "input_statement",
	    "name": "STATEMENTS"
	} ],
	"colour": Code.color_llvgl
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

	    // check if code has a start button. Add one if not
	    var hasStart = false;
	    Code.workspace.getTopBlocks().forEach(b => {
		if(b.type == "start") hasStart = true;
	    });
						  
	    if(!hasStart) {
		console.log("add start");
		var sb = Code.workspace.newBlock('start');
		sb.setMovable(false);
		sb.setDeletable(false);
		sb.initSvg();
		sb.render();

		var existing = Code.workspace.getTopBlocks();
		if(existing.length > 0)
		    sb.nextConnection.connect(existing[0].previousConnection);
	    }
						  
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
    /********************         llvgl        **********************/
    /****************************************************************/

    const event_name_map = {
	"EVENT.CLICKED": "clicked",
	"EVENT.PRESSED": "pressed",
	"EVENT.RELEASED": "released",
	"EVENT.VALUE_CHANGED": "value_changed"
    };
    
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
	if(statements == "") statements = "    pass"	    

	var code = "def on_" + object + "_" + event_name_map[type] +
	    "("+object+",_e):\n"+getGlobal(block, "    ", object)+statements + '\n';

	Blockly.Python.definitions_["on_" + object + "_" + event_name_map[type]] = code;
	
	return "";
    };

    Blockly.Python['llvgl_on_window_close'] = function(block) {
	Blockly.Python.definitions_['from_llvgl_import_all'] = "from llvgl import *";
	var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
	if(statements == "") statements = "    pass"	    
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

	// topic is also used as part of the function name (would be nice to be able to
	// use a lambda here). So remove all chars which are no letters or numbers or
	// the underscore and make sure first is a char
	var topicvar = "on_mqtt_" + topic.replace("\\","").replace(/[\W]/, '');
	   
	var message = Blockly.Python.variableDB_.getName(block.getFieldValue('MESSAGE'), Blockly.Variables.NAME_TYPE);
	var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
	if(statements == "") statements = "    pass"	    
	
	var code = "def " + topicvar + 
	    "("+message+"):\n"+getGlobal(block, "    ", message)+statements + '\n';

	Blockly.Python.definitions_[topicvar] = code;
	
	return "mqtt.subscribe('"+topic+"', "+topicvar+")\n";
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
