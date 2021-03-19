/*
 * liveview.js - live remote view for micropython + httpd + websockets
 */

'use strict';

class Liveview {
    constructor(canvas) {
	this.ctx = canvas.getContext("2d");
	
	if(('createTouch' in document) || ('ontouchstart' in window)) {
	    canvas.addEventListener("touchstart", this.on_mouse.bind(this), false);	      
	    document.addEventListener("touchmove", this.on_mouse.bind(this), false);
	    document.addEventListener("touchend", this.on_mouse.bind(this), false);
	} else {
	    canvas.addEventListener("mousedown", this.on_mouse.bind(this), false);	      
	    document.addEventListener("mousemove", this.on_mouse.bind(this), false);
	    document.addEventListener("mouseup", this.on_mouse.bind(this), false);
	}
    }

    /* request a screen from the esp32 client */
    ws_request_screen() {
	this.ws.send('screen'); // request screen content
    }
    
    /* parse a 16 bit integer */
    read_u16be(array, index) {
	return (array[index+0]<<8) + array[index+1];
    }

    /* parse an "area" packet containing a portion of screen data */
    process_area(context, array) {
	// sanity check, shouldn't be necessary:
	// check if a full header fits in array
	if(array.length < 8) return 0;
	
	// read first eight bytes as area struct
	var area_x1 = this.read_u16be(array, 0);

	// x1 would be 8075 (0x1f8b) in case of gzip compressed data
	if(area_x1 > 239) {
	    array = (new Zlib.Gunzip(array)).decompress();
	    area_x1 = this.read_u16be(array, 0);
	}
	
	var area_x2 = this.read_u16be(array, 2);
	var area_y1 = this.read_u16be(array, 4);
	var area_y2 = this.read_u16be(array, 6);
	
	// create bitmap exactly fitting our data
	var width = area_x2-area_x1+1;
	var height = area_y2-area_y1+1;			  
	var size = width * height;
	
	// some sanity check. Should not be necessary if sender is ok
	if(8+2*size <= array.length) {
	    // allocate buffer for this chunk
	    var imageData = context.createImageData(width,height);
	    for(var i = 0;i<size;i++) {
		// read two bytes into one big endian uint16 
		var pixel = this.read_u16be(array, 8+2*i);
		// convert rgb565 to rgba32
		imageData.data[4*i+0] = (pixel >> 8) & 0xf8;
		imageData.data[4*i+1] = (pixel >> 3) & 0xfc;
		imageData.data[4*i+2] = (pixel << 3) & 0xf8;
		imageData.data[4*i+3] = 0xff;
	    }
	    context.putImageData(imageData, area_x1, area_y1);
	}
	return 2*size;
    }
    
    // start the websocket server
    ws_start() {
	// redirect to real hardware if running web server on localhost
	console.log(document.location.hostname);
	if(document.location.hostname == "localhost")
	    var url = "ws://192.168.0.157/ws";
	else
            var url = "ws://"+document.location.hostname+"/ws";
    
	this.ws = new WebSocket(url);
	this.ws.binaryType = "arraybuffer";
	this.ws_rx = 0;
	
	// When the connection is open, send some data to the server
	this.ws.onopen = function() {
	    this.ws_request_screen();
	}.bind(this);
	
	// Log errors
	this.ws.onerror = function (error) {
	    console.log('WebSocket Error ', error);
	};
	
	this.ws.onclose = function () {
	    console.log('WebSocket closed');	      
	}
	
	// Log messages from the server
	this.ws.onmessage = function (e) {
	    var pixelArray = new Uint8Array(e.data);
	    	    
	    // read while there is data in the buffer
	    var idx = 0;
	    while(idx < pixelArray.length) {
		var bytes = this.process_area(this.ctx, pixelArray.slice(idx));
		idx += 8 + bytes;
		this.ws_rx += bytes;
	    }
	    
	    // Received a complete frame?
	    if(this.ws_rx == 320*240*2) {
		// Request next one in 10ms ...
		this.ws_rx = 0;
		window.setTimeout(this.ws_request_screen.bind(this), 10);
	    }
	}.bind(this);
    }
    
    connect() {
	this.ws_start();
    }
    
    on_mouse(event) {
	if(!this.ws) return;

	// ignore move events without button pressed
	if( (event.type == "mousemove") && !event.buttons) return;
	if( ((event.type == "mousemove") || (event.type == "touchmove"))
	    && !this.downInWin) return;

	if(event.type == "mousedown" || event.type == "touchstart")
	    this.downInWin = true;
	
	if(event.type == "mouseup" || event.type == "touchend")
	    this.downInWin = false;
	
	// limit report rate of move events
	if(event.type == "mousemove" || event.type == "touchmove") {
	    if(this.moveLimit) return;
	    this.moveLimit = true;
	    window.setTimeout(function() {
		this.moveLimit = false;
	    }.bind(this), 250)	  
	}	  

	// the remaining events are all reported to the target	  
	var cbox = event.target.getBoundingClientRect();
	if(event.type.startsWith("touch")) {
	    var touch = event.touches[0] || event.changedTouches[0];
	    var x = Math.floor(touch.clientX - cbox.x);
	    var y = Math.floor(touch.clientY - cbox.y);
	    var b = (event.type == "touchend")?0:1;
	} else {
	    var x = Math.floor(event.clientX - cbox.x);
	    var y = Math.floor(event.clientY - cbox.y);
	    var b = event.buttons;
	}
	// console.log("Liveview event:", x, y, b);
	this.ws.send('mouse:'+x+","+y+","+b);
    }
    
    disconnect() {
	console.log("Stopping live view");
	if(this.ws) {
	    this.ws.close();
	    this.ws = undefined;
	}
    }
}
