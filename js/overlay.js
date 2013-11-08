function Overlay(num) {
	/*this.canvas = document.getElementById('ol'+num);
	var ctx = this.canvas.getContext('2d');
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(10,10,200,200);
	ctx.fillStyle = '#00ff00';
	ctx.fillRect(0,0,200,200);
	ctx.fillStyle = '#0000ff';
	ctx.fillRect(-10,-10,200,200);*/
};


/* ===== CANVAS 2D */

$(function(){
	canvas = document.getElementById("hud-overlay");
	ctx = canvas.getContext("2d");

	scene1();
	/*(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());*/
})

var scene1 = function(){
	var fps = 30;
	var frame = 0;
	var time = 1000/fps;

	var text_index = 0;
	var char_index = 0;
	var texts = ['initializing boot sequence...', 'all your base are belong to us', 'fading out...'];
	var blurp = '';
	var hold = 30;

	function draw() {
		setTimeout(function() {
	        frame++;
	        if(frame>fps) frame = 1;

		    // Clear the canvas
		    ctx.clearRect(0, 0, canvas.width, canvas.height);

		    // Drawing code goes here... for example updating an 'x' position:
		    //ctx.globalAlpha = 0.4;
			//ctx.fillStyle = 'rgba(255,0,0,0.1)';
			//ctx.fillRect(0, 0, 640, 480);

			ctx.font = '24pt "visitor_tt1_brkregular" normal';
			ctx.fillStyle = '#ffffff';
		    ctx.fillText(frame, 600, 460);

		    blurp += texts[text_index].charAt(char_index);
		    createjs.Sound.play('sounds/blip.mp3');
			char_index += 1;

			ctx.font = '14pt "visitor_tt1_brkregular" normal';
			ctx.fillStyle = '#ffffff';
		    ctx.fillText(blurp, 50, 100);
		    if(char_index == texts[text_index].length) {
	    		char_index = 0;
				if(text_index<texts.length-1){
					text_index++;
					blurp = '';
					setTimeout(draw,2500);
				}
				else {
					setTimeout(scene2,2500);
				}
				
			}else{
				draw();
			}
	    }, time);
	}
	setTimeout(draw,100);
}

var scene2 = function(){
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.font = '24pt "visitor_tt1_brkregular" normal';
	ctx.fillStyle = '#ffffff';
    ctx.fillText('scene 2', 280, 220);
};

addEventListener('DOMContentLoaded', function() {
	var manifest = [
		{ id: 'boot', src: 'sounds/robotpoweron.mp3' },
		{ id: 'blip', src: 'sounds/blip.mp3' }
	];
	createjs.Sound.addEventListener('fileload', handleLoad);
	createjs.Sound.registerManifest(manifest);
	function handleLoad(event) {
		console.log('loaded ' + event.src);
	}
});

