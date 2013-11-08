/* ===== CANVAS 2D */

$(function(){
	var canvas = document.getElementById("hud-overlay"),
	ctx = canvas.getContext("2d");

	var fps = 15;
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
			char_index += 1;

			ctx.font = '14pt "visitor_tt1_brkregular" normal';
			ctx.fillStyle = '#ffffff';
		    ctx.fillText(blurp, 50, 100);
		    if(char_index == texts[text_index].length) {
	    		char_index = 0;
				if(text_index<texts.length-1) text_index++;
				else text_index=0;
				blurp = '';
				setTimeout(draw,2500);
			}else{
				draw();
			}
	    }, time);
	}
	setTimeout(draw,100);
	 
	(function() {
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
	}());
})

