/* ===== CANVAS 2D */
$(function(){
	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	canvas_width = canvas.width;
	canvas_height = canvas.height;

	center_x = canvas.width/2;
	center_y = canvas.height/2;

	document.getElementById('readyForDemo').addEventListener('click', function() {
		$('.camselect').hide();
		$(this).hide();
	});

	hud.fillStyle = '#000';
	hud.fillRect(0, 0, canvas.width, canvas.height);

	document.getElementById('container').addEventListener('click', function() {
//		sceneCrash();
		sceneBoot();
	});

	function preloadSound() {
		var manifest = [
			{ id: 'boot', src: 'sounds/robotpoweron.mp3' },
			{ id: 'blip', src: 'sounds/blip.mp3' },
			{ id: 'blip', src: 'sounds/macstartup.mp3' }
		];
		createjs.Sound.addEventListener('fileload', handleLoad);
		createjs.Sound.registerManifest(manifest);
		function handleLoad(event) {
			console.log('loaded ' + event.src);
		}
	};

	preloadSound();
});
