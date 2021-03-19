// code.js

"use strict";

var Code = {};

// connect to websocket
function ws_connect() {
    Code.ws = new WebSocket("ws://"+document.location.hostname+":4711/");
    
    Code.ws.onmessage = function(evt) {
	console.log("WS RX:" + evt.data);
        // obj = JSON.parse(evt.data);
    };
    
    Code.ws.onopen = function(evt) {
	console.log("WS CON");
    };
    
    Code.ws.onerror = function(evt) {
    };
    
    Code.ws.onclose = function(evt) {
	console.log("WS DISC");
	
        //try to reconnect
	setTimeout(function(){ ws_connect() }, 1000);
    };

    Code.ws.send("Hallo\n");
};

function loadToolbox() {
    // var toolbox_name = "toolbox.xml";
    // ?random="+new Date().getTime()); // avoid caching

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

function toolbox_install(toolboxText) {
    var toolbox = Blockly.Xml.textToDom(toolboxText);
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
    
    var python_code = Blockly.Python.workspaceToCode(Code.workspace);

    // generate xml to post it with the python code
    var blockly_dom = Blockly.Xml.workspaceToDom(Code.workspace);
    var blockly_code = Blockly.Xml.domToText(blockly_dom);

    post("blockly", [ { "filename": project+".py",  "data": python_code },
		      { "filename": project+".xml", "data": blockly_code } ])
}

window.addEventListener('load', init);
