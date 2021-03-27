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
	"message0": "New %1 of type %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "type",
	    "options": [
		[ "Label",  "  lv.label"    ],
		[ "Button",   "lv.btn"      ],
		[ "Switch",   "lv.switch"   ],
		[ "Checkbox", "lv.checkbox" ]
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
	"message0": "Align %1 %2 %3",
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
	    "check": "coo"
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
	"message0": "if event is %1",
	"args0": [ {
	    "type": "field_dropdown",
	    "name": "EVENT",
	    "options": [
		[ "clicked", "lv.EVENT.CLICKED" ],
		[ "pressed", "lv.EVENT.PRESSED" ],
		[ "released", "lv.EVENT.RELEASED" ]
	    ]
	} ],
	"output": "Boolean",
	"colour": Code.color_lvgl
    },{
	"type": "lvgl_coordinate",
	"message0": "%1 , %2",
	"args0": [ {
	    "type": "input_value",
	    "name": "X"
	}, {
	    "type": "input_value",
	    "name": "Y"
	} ],
	"inputsInline": true,
	"output": "coo",
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

function getGlobal(prefix) {
    // all variables are global in blockly
    var usedVars = Blockly.Variables.allUsedVarModels(Code.workspace);
    // console.log("All used vars", usedVars);

    if(!usedVars.length) return "";
    
    var global = "global ";
    usedVars.forEach(v => { global += v["name"] + ","; });
    return prefix + global.substring(0, global.length - 1) + "\n";
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

    Blockly.Python['lvgl_page'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";

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
		"        bg_style.set_bg_color(lv.STATE.DEFAULT, " +
		"lv.color_hex(0x"+colour_bg.substring(1)+"));\n" +
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
	code += "    def __init__(self, page):\n" + getGlobal("        ")
	
	return code + statements;
    };

    // tell generator about our custom blocks
    Blockly.Python['lvgl_object'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
	var variable_obj = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_type = block.getFieldValue('type');
	var code = variable_obj + " = " + dropdown_type + "(page);\n";
	return code;
    };

    Blockly.Python['lvgl_set_text'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
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
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
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
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
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
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_align = block.getFieldValue('ALIGN');
	var value_coordinate = Blockly.Python.valueToCode(block, 'COORDINATE', Blockly.Python.ORDER_ATOMIC);
	if(value_coordinate == "") { value_coordinate = "0, 0"; }

	var code = variable_object+".align(page, " + dropdown_align + ", " + value_coordinate + ");\n";
	return code;
    };

    Blockly.Python['lvgl_on_event'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var statements_handler = Blockly.Python.statementToCode(block, 'handler');

	if(statements_handler == "") statements_handler = "    pass\n";

	var code =
	    "def on_event(obj, evt):\n" + getGlobal("    ") + statements_handler + "\n" +
	    variable_object + ".set_event_cb(on_event)\n";
	    
	return code;
    };
    
    Blockly.Python['lvgl_event'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
	var dropdown_event = block.getFieldValue('EVENT');
	var code = "evt == " + dropdown_event;
	return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['lvgl_coordinate'] = function(block) {
	Blockly.Python.definitions_['import_lvgl_as_lv'] = "import lvgl as lv";
	var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
	var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
	var code = value_x + ", " + value_y;
	return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /****************************************************************/
    /********************        ftDuino       **********************/
    /****************************************************************/

    function ftduino_prepare() {
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

	return { bus: busVar, addr: addrVar };
    }
    
    Blockly.Python['ftduino_i2c_scan'] = function(block) {
	var vars = ftduino_prepare()
	var code = vars["bus"]+".scan()"
	return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['ftduino_set_addr'] = function(block) {
	var vars = ftduino_prepare()
	var value_address = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
	var code = vars["addr"] + " = " + value_address + "\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_mode'] = function(block) {
	var vars = ftduino_prepare()	
	var dropdown_port = block.getFieldValue('PORT');
	var dropdown_mode = block.getFieldValue('MODE');
	var code = vars["bus"] + ".writeto(" + vars["addr"] +
	    ", bytearray([ "+ dropdown_port+", "+ dropdown_mode+"]))\n";
	return code;
    };
    
    Blockly.Python['ftduino_output_value'] = function(block) {
	var vars = ftduino_prepare()	
	var dropdown_port = block.getFieldValue('PORT');
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
	var code = vars["bus"] + ".writeto(" + vars["addr"] +
	    ", bytearray([ "+ dropdown_port+", "+ value_value+"]))\n";
	return code;
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
