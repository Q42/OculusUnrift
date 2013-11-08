/* ===== CANVAS 2D */
$(function(){
	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	document.getElementById('container').addEventListener('click', function() {
		sceneBoot();
	});
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
