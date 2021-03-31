// code.js

"use strict";

var Code = {};
Code.color_lvgl = 0
Code.color_ftduino = 90
Code.color_misc = 60

var customBlocks = [
    {
	"type": "delay",
	"message0": "delay seconds %1",
	"args0": [
	    {
		"type": "input_value",
		"name": "TIME",
		"check": "Number"
	    }
	],
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
	    "options": [ [ "O1", "0x00" ],
			 [ "O2", "0x02" ],
			 [ "O3", "0x04" ],
			 [ "O4", "0x06" ],
			 [ "O5", "0x08" ],
			 [ "O6", "0x0a" ],
			 [ "O7", "0x0c" ],
			 [ "O8", "0x0e" ] ]
	}, {
	    "type": "field_dropdown",
	    "name": "MODE",
	    "options": [ [ "OFF", "0x00" ],
			 [ "HI",  "0x01" ],
			 [ "LOW", "0x02" ] ]
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
	    "options": [ [ "O1", "0x01" ],
			 [ "O2", "0x03" ],
			 [ "O3", "0x05" ],
			 [ "O4", "0x07" ],
			 [ "O5", "0x09" ],
			 [ "O6", "0x0b" ],
			 [ "O7", "0x0d" ],
			 [ "O8", "0x0f" ] ]	    
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
	    "options": [ [ "I1", "0x10" ],
			 [ "I2", "0x12" ],
			 [ "I3", "0x14" ],
			 [ "I4", "0x16" ],
			 [ "I5", "0x18" ],
			 [ "I6", "0x1a" ],
			 [ "I7", "0x1c" ],
			 [ "I8", "0x1e" ] ]
	}, {
	    "type": "field_dropdown",
	    "name": "MODE",
	    "options": [ [ "Voltage",     "0x00" ],
			 [ "Resistance",  "0x01" ],
			 [ "Switch",      "0x02" ] ]
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
	    "options": [ [ "I1", "0x10" ],
			 [ "I2", "0x12" ],
			 [ "I3", "0x14" ],
			 [ "I4", "0x16" ],
			 [ "I5", "0x18" ],
			 [ "I6", "0x1a" ],
			 [ "I7", "0x1c" ],
			 [ "I8", "0x1e" ] ]
        } ],
	"output": "Number",
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

function getGlobal(block, prefix) {
    // all variables are global in blockly
    var usedVars = Blockly.Variables.allUsedVarModels(block.workspace);
    var devVars = Blockly.Variables.allDeveloperVariables(block.workspace);

    if(!usedVars.length && !devVars.length) return "";

    // start with user variables
    var globals = []
    usedVars.forEach(v => {
	globals.push(Blockly.Python.variableDB_.getName(v["name"],
			Blockly.VARIABLE_CATEGORY_NAME));
    });

    // Add developer variables.
    devVars.forEach(v => {
	globals.push(Blockly.Python.variableDB_.getName(v,
			Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    });
    
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
	    function() { return ['i2cBus', 'ftduinoAddress' ]; }
	
	if(b["type"].startsWith("lvgl_task"))
	    Blockly.Blocks[b["type"]]["getDeveloperVars"] =
	    function() { return ['tasks' ]; }
    });
    
    Code.workspace = Blockly.inject('blocklyDiv',
				    { media: './blockly/media/',
				      toolbox: toolbox,
				      // scrollbars: false,  // 
				      zoom: { // controls: true,
					  wheel: true,
					  // startScale: 1.0,
					  maxScale: 2,
					  minScale: 0.5,
					  scaleSpeed: 1.1
				      }
				    } );

    parseUrl("xml", function(name, code) {
	// set project name in input field and set text into editor
	if(name) document.getElementById("project").value = name;
	if(code) {
	    var xml = Blockly.Xml.textToDom(code);
	    Blockly.Xml.domToWorkspace(xml, Code.workspace);
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
	
	code += "    def __init__(self, page):\n" + getGlobal(block, "        ")
	
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
	var code = "def on_event(obj, evt):\n" + getGlobal(block, "    ") + statements_handler +
	    "\n" + variable_object + ".set_event_cb(on_event)\n";
	    
	return code;
    };

    Blockly.Python['lvgl_event'] = function(block) {
	lvgl_prepare(false, false);
	var dropdown_event = block.getFieldValue('EVENT');
	var code = "evt == " + dropdown_event;
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
	      "  if isinstance(obj, lv.gauge):", 
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
    
    /****************************************************************/
    /********************        ftDuino       **********************/
    /****************************************************************/

    function ftduino_prepare(block, needsWrite, needsRead) {
	// make sure the i2c variables have the correct defaults
	var busVar = Blockly.Python.variableDB_.getName('i2cBus', Blockly.Names.DEVELOPER_VARIABLE_TYPE);
	var addrVar = Blockly.Python.variableDB_.getName('ftduinoAddress', Blockly.Names.DEVELOPER_VARIABLE_TYPE);
	
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
		v = addrVar + " = 43";
		break;
	    }
	    new_vars.push(v);
	});
	
	Blockly.Python.definitions_['variables'] = new_vars.join('\n');
	Blockly.Python.definitions_['from_machine_import_Pin_I2C'] = "from machine import Pin, I2C";

	var retval = { bus: busVar, addr: addrVar };
	
	// forgiving i2c read/write
	if(needsWrite) {
	    retval["write"] = Blockly.Python.provideFunction_(
		'ftduino_write',
		[ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(__reg, __value):',
		  getGlobal(block, "  "),
		  "  try:",
		  "    " + busVar + ".writeto_mem(" + addrVar + ", __reg, bytearray([int(__value)]));",
		  "  except:",
		  "    # ftDuino write failed, return anyway",
		  "    pass"
		])
	}
	
	if(needsRead) {
	    retval["read"] = Blockly.Python.provideFunction_(
		'ftduino_read',
		[ "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(__reg):',
		  getGlobal(block, "  "),
		  "  try:",
		  "    return int.from_bytes(" + busVar + ".readfrom_mem(" + addrVar + ", __reg, 2), 'little')",
		  "  except:",
		  "    # ftDuino read failed, return anyway",
		  "    return 0"
		])
	}
	    
	return retval;
    }
    
    Blockly.Python['ftduino_i2c_scan'] = function(block) {
	var vars = ftduino_prepare(block, false, false)
	var code = vars["bus"]+".scan()"
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['ftduino_set_addr'] = function(block) {
	var vars = ftduino_prepare(block, false, false)
	var value_address = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
	var code = vars["addr"] + " = " + value_address + "\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_mode'] = function(block) {
	var vars = ftduino_prepare(block, true, false)	
	var dropdown_port = block.getFieldValue('PORT');
	var dropdown_mode = block.getFieldValue('MODE');
	var code = vars["write"] + "(" + dropdown_port + ", "+ dropdown_mode+")\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_value'] = function(block) {
	var vars = ftduino_prepare(block, true, false)	
	var dropdown_port = block.getFieldValue('PORT');
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = vars["write"] + "(" + dropdown_port + ", "+ value_value+")\n";
	return code;
    };

    Blockly.Python['ftduino_input_mode'] = function(block) {
	var vars = ftduino_prepare(block, true, false)	
	var dropdown_port = block.getFieldValue('PORT');
	var dropdown_mode = block.getFieldValue('MODE');
	var code = vars["write"] + "(" + dropdown_port + ", "+dropdown_mode +")\n";
	return code;
    };
    
    Blockly.Python['ftduino_input_value'] = function(block) {
	var vars = ftduino_prepare(block, false, true)	
	var dropdown_port = block.getFieldValue('PORT');
	var code = vars["read"]+"(" + dropdown_port + ")";
	return [code, Blockly.Python.ORDER_NONE];
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
    
    // Pyhton should be indeted by 4 spaces
    Blockly.Python.INDENT = "    ";
}

function init() {
    // once the toolbox is loaded blockly will be instanciated
    loadToolbox();
}

function upload() {
    var project = document.getElementById("project").value;
    if(!project) project = document.getElementById("project").placeholder;
    if(!project) {
	set_status(status.error, "No project name given");
	return;
    }

    Code.generator_flags = { }
    var python_code = Blockly.Python.workspaceToCode(Code.workspace);

    // don't actually post on localhost
    if(document.location.hostname == "localhost") {
	console.log("Python code:");
	console.log(python_code);
	return;
    }

    // generate xml to post it with the python code
    var blockly_dom = Blockly.Xml.workspaceToDom(Code.workspace);
    var blockly_code = Blockly.Xml.domToText(blockly_dom);

    post("blockly", [ { "filename": project+".py",  "data": python_code },
		      { "filename": project+".xml", "data": blockly_code } ])
}

window.addEventListener('load', init);
