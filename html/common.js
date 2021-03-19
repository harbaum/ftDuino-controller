/*
 * common.js
 *
 */

const status = {
  info: 1,
  success: 2,
  warning: 3,
  error: 4
};

var is_sd;  // remember if current project is stored in SD card

function toggle_fullscreen() {
    var element = document.documentElement;

    var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
    
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

function menu_hide() {
    document.getElementById('bmenub').checked = false;
}

function hexdump(buffer) {
    var lines = [];
    var hex = "0123456789ABCDEF";
    for (var b = 0; b < buffer.length; b += 16) {
        var block = buffer.slice(b, Math.min(b + 16, buffer.length));
        var addr = ("0000" + b.toString(16)).slice(-4);
        var codes = block.split('').map(function (ch) {
            var code = ch.charCodeAt(0);
            return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
        }).join("");
        codes += "   ".repeat(16 - block.length);
        var chars = block.replace(/[\x00-\x1F\x20]/g, '.');
        chars +=  " ".repeat(16 - block.length);
        lines.push(addr + " " + codes + "  " + chars);
    }
    console.log(lines.join("\n"));
}

function set_status(level, text) {
    const types = {
	1: ["normal", "Info"],
	2: ["success", "Success" ],
	3: ["warning", "Warning" ],
	4: ["error", "Error" ]
    };
    
    var element = document.getElementById("status");
    element.innerHTML = "<span class=\"label "+types[level][0]+"\">"+types[level][1]+"</span> " + text;
}

function post_cmd(cmd, cb) {
    set_status(status.info, "Sending command ...");

    var http = new XMLHttpRequest();
    http.open("POST", "cmd", true);
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
	    if(http.status == 200)
		set_status(status.success, "Command ok");
	    else
		set_status(status.error, "Command failed: " + http.statusText);
	    
	    if(cb) cb(http.status == 200);
	}	    
    }

    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Cache-Control", "no-cache");
    console.log("sending", JSON.stringify(cmd));
    http.send(JSON.stringify(cmd));
}

function post(project_type, objects) {
    var formData = new FormData();

    set_status(status.info, "Uploading ...");
    
    objects.forEach(o => {
	// derive mime type from file extension    
	var mimetype;
	var type;
	if(o.filename.endsWith(".py")) {
	    mimetype = "text/x-python";
	    type = "python";
	}
	if(o.filename.endsWith(".xml")) {
	    mimetype = "application/xml";
	    type = "blockly";
	}
	    
	if(mimetype && type) {
	    var filename = "/apps/"+o.filename;
	    if(is_sd) filename = "/sd" + filename;
	    
	    var blob = new Blob([o.data], { "type": mimetype });
	    formData.append(type, blob, filename);
	}
    });
	
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
	    if(request.status == 200) {
		set_status(status.success, "Upload ok");
	    } else {
		set_status(status.error, "Upload failed: " + request.statusText);
	    }
	}	    
    }

    request.open( "POST", "upload/"+project_type, true );

    request.setRequestHeader("Cache-Control", "no-cache");
    request.send( formData );
}

function load_project(type, name, cb) {
    // cut of any trailing "/" from name as we'll add that later
    if(name[0] == "/")
	name = name.slice(1);
	
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
	// extract basename from full file name 
	var prj = name.split("/")[name.split("/").length-1] // cut path
	prj = prj.split('.').slice(0, -1).join('.'); // cut extension
	is_sd = name.startsWith("sd/");
	
        if (http.readyState == XMLHttpRequest.DONE) {
            if (http.status == 200)
		cb(prj, http.responseText);
	    else
		cb(prj, null);
	}
    }
    http.open("GET", "files/"+name, true);
    http.send( null );
}
    
function parseUrl(type, cb) {
    const queryString = window.location.search;
    if(!queryString || queryString == "") {
	cb(null, null, null);
	return;
    }

    const urlParams = new URLSearchParams(queryString);
    const project = urlParams.get('project')
    if(!project || project == "") {
	cb(null, null, null);
	return;
    }

    load_project(type, project, cb);
}

function is_valid_filename_char(first, chr) {
    return chr.length === 1 && (
	(first  && chr.match(/[a-zA-Z_]/i)) ||
        (!first && chr.match(/[a-zA-Z0-9_.]/i)));
}

function input_filename_limit(id) {
    var input = document.getElementById(id);
    if(input && input.value) {
	// clean string from illegal characters
	var allowed_value = "";
	for (var i = 0; i < input.value.length; i++) {
	    // replace spaces by underscores
	    if(input.value.charAt(i) == ' ')
		allowed_value += '_';
	    else if(is_valid_filename_char(!allowed_value.length, input.value.charAt(i)))
		allowed_value += input.value.charAt(i);
	}

	if(input.value != allowed_value)
	    input.value = allowed_value;
    }    
}

class Window {
    constructor() {
	this.isDown = false;
	this.isVisible = false;
	this.downX = 0;
	this.downY = 0;
	this.w = document.getElementById('window');
	
	this.update();

	var windowBar = document.getElementById('windowBar');
	if(('createTouch' in document) || ('ontouchstart' in window)) {
	    windowBar.addEventListener('touchstart', this.onMouseDown.bind(this));
	    document.addEventListener('touchmove', this.onMouseMove.bind(this));
	    document.addEventListener('touchend', this.onMouseUp.bind(this));
	} else {
	    windowBar.addEventListener('mousedown', this.onMouseDown.bind(this));
	    document.addEventListener('mousemove', this.onMouseMove.bind(this));
	    document.addEventListener('mouseup', this.onMouseUp.bind(this));
	}
	    
	var closeButton = document.getElementById('windowClose');
	closeButton.addEventListener('click', this.toggle.bind(this));
	window.addEventListener("resize", this.onResize.bind(this));
	
	this.liveview = new Liveview(document.getElementById('windowView'));
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.update();
    }
    
    update() {
	// check if visibility has changed
	if(!this.isVisible) {
	    if(this.w.style.display == 'block') {
		this.w.style.display = 'none';
		this.liveview.disconnect();
	    }
	} else {
	    if(this.w.style.display != 'block') {
		this.w.style.display = 'block';

		// center window if no position available yet
		if(!this.x || !this.y) {
		    this.x = (document.body.clientWidth - this.w.clientWidth)/2;
		    this.y = (document.body.clientHeight - this.w.clientHeight)/2;

		    // make sure window never leaves screen to the top
		    if(this.y < 0) this.y = 0;
		}
		
		if(this.liveview)
		    this.liveview.connect();
		
	    }
	    this.w.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
	}	
    }
    
    onResize() {
	if(this.w.style.display == 'block') {
	    var new_x = undefined, new_y = undefined;
	    
	    if(this.y > document.body.clientHeight - this.w.clientHeight) {
		new_y = document.body.clientHeight - this.w.clientHeight;
		if(new_y < 0) new_y = 0;
	    }

	    if(this.x > document.body.clientWidth - this.w.clientWidth) {
		new_x = document.body.clientWidth - this.w.clientWidth;
		if(new_x < 0) new_x = 0;
	    }

	    if((new_x && (new_x != this.x)) || (new_y && (new_y != this.y))) {
		if(new_x) this.x = new_x;
		if(new_y) this.y = new_y;
		this.update();
	    }
	}
    }

    onMouseMove(e) {
	if (this.isDown) {
	    if(event.type.startsWith("touch")) {
		var touch = e.touches[0] || e.changedTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
	    } else {
		var x = e.pageX;
		var y = e.pageY;
	    }		
	    this.x = Math.min(Math.max(x - this.downX, 0),
				    document.body.clientWidth - this.w.clientWidth - 4);
	    this.y = Math.min(Math.max(y - this.downY, 0),
				    document.body.clientHeight - this.w.clientHeight - 6);
	}

	// Update window position
	this.update();
    }
    
    onMouseDown(e) {
	this.isDown = true;
	if(event.type.startsWith("touch")) {
	    var touch = e.touches[0] || e.changedTouches[0];
	    this.downX = touch.pageX - this.x;
	    this.downY = touch.pageY - this.y;	    
	} else {
	    this.downX = e.pageX - this.x;
	    this.downY = e.pageY - this.y;
	}
    }
    
    onMouseUp() {
	this.isDown = false;
    }
}
