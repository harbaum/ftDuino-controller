// code.js

"use strict";

var Code = {};

var customBlocks = [
    {
	"type": "page",
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
	"colour": 330,
	"tooltip": "A LVGL UI page"
    }, {
	"type": "object",
	"message0": "New %1 of type %2",
	"args0": [ {
	    "type": "field_variable",
	    "name": "object",
	    "variable": "object"
	}, {
	    "type": "field_dropdown",
	    "name": "type",
	    "options": [
		[ "Label",  "lv.label"  ],
		[ "Button",	"lv.btn"    ],
		[ "Switch", "lv.switch" ]
	    ]
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 330
    }, {
	"type": "lvgl_set_text",
	"message0": "Set text of %1 to %2",
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
	"colour": 330
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
	    "options": [ [ "centered", "lv.ALIGN.CENTER" ],
			 [ "top left", "lv.ALIGN.IN_TOP_LEFT" ],
			 [ "top right", "lv.ALIGN.IN_TOP_RIGHT" ],
		       ]
	}, {
	    "type": "input_value",
	    "name": "COORDINATE",
	    "check": "coo"
	} ],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 330
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
	"colour": 330
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
	"colour": 330
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
	"colour": 330
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
    console.log("All used vars", usedVars);

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

    // tell generator about our custom blocks
    Blockly.Python['object'] = function(block) {
	var variable_obj = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_type = block.getFieldValue('type');
	var code = variable_obj + " = " + dropdown_type + "(page);\n";
	return code;
    };

    Blockly.Python['lvgl_set_text'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);

	// at this point we'd like to know what type of object this is ...
	Code.generator_flags["set_text"] = true;	
	
	var code = "set_text("+ variable_object + ", " + value_text + ");\n";
	return code;
    };
    
    Blockly.Python['lvgl_align'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var dropdown_align = block.getFieldValue('ALIGN');
	var value_coordinate = Blockly.Python.valueToCode(block, 'COORDINATE', Blockly.Python.ORDER_ATOMIC);
	if(value_coordinate == "") { value_coordinate = "0, 0"; }

	var code = variable_object+".align(page, " + dropdown_align + ", " + value_coordinate + ");\n";
	return code;
    };

    Blockly.Python['lvgl_on_event'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var statements_handler = Blockly.Python.statementToCode(block, 'handler');

	if(statements_handler == "") statements_handler = "    pass\n";

	var code =
	    "def on_event(obj, evt):\n" + getGlobal("    ") + statements_handler + "\n" +
	    variable_object + ".set_event_cb(on_event)\n";
	    
	return code;
    };
    
    Blockly.Python['lvgl_event'] = function(block) {
	var dropdown_event = block.getFieldValue('EVENT');
	var code = "evt == " + dropdown_event;
	return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['lvgl_coordinate'] = function(block) {
	var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
	var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
	var code = value_x + ", " + value_y;
	return [code, Blockly.Python.ORDER_ATOMIC];
    };
    
    Blockly.Python['page'] = function(block) {
	// set global marker that we genated a page
	Code.generator_flags["lvgl"] = true;
		
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

    var prefix = ""
    if("lvgl" in Code.generator_flags && Code.generator_flags["lvgl"])
	prefix += "#\n# Blocky generated micropython for ftDuino32 controller\n#\n\n" +
	"import lvgl as lv\n\n"

    // set text needs a helper function
    if("set_text" in Code.generator_flags && Code.generator_flags["set_text"]) {
	prefix += "def set_text(obj, str):\n" +
	    "    if isinstance(obj, lv.label):\n" +
            "        obj.set_text(str);\n" +
	    "    elif isinstance(obj, lv.btn):\n" +
            "        label = lv.label(obj)\n" +
            "        label.set_text(str);\n\n"
    }
	
    python_code = prefix + python_code;

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
