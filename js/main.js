/* ===== CANVAS 2D */
$(function(){
	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	document.getElementById('readyForDemo').addEventListener('click', function() {
		$('.camselect').hide();
		$(this).hide();
	});

	hud.fillStyle = '#000';
	hud.fillRect(0, 0, 512, 480);

	document.getElementById('container').addEventListener('click', function() {
		sceneBoot();
	});

	function preloadSound() {
		var manifest = [
			{ id: 'boot', src: 'sounds/robotpoweron.mp3' },
			{ id: 'blip', src: 'sounds/blip.mp3' }
		];
		createjs.Sound.addEventListener('fileload', handleLoad);
		createjs.Sound.registerManifest(manifest);
		function handleLoad(event) {
			console.log('loaded ' + event.src);
		}
	};

	preloadSound();
});
