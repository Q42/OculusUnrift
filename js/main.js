/* ===== CANVAS 2D */
$(function(){
	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	document.getElementById('container').addEventListener('click', function() {
		sceneBoot();
	});
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
});

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

