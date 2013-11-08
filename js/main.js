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
	}

	function initFrequency() {
		navigator.webkitGetUserMedia({audio:true}, function(stream) {
			var audioContext = new webkitAudioContext();
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			var mediaStreamSource = audioContext.createMediaStreamSource(stream);
			mediaStreamSource.connect(analyser);
			var freqByteData = new Uint8Array(analyser.frequencyBinCount);

			function draw() {
				analyser.getByteFrequencyData(freqByteData);
				hud.clearRect(0, 0, canvas.width, canvas.height);
				hud.fillStyle = 'rgba(255, 255, 255, 0.1)';
				for (var i = 0; i < freqByteData.length / 4; i++) {
					hud.fillRect(350 + 8*i, canvas.height/2 + 100, 10, -1 * freqByteData[i]);
					//hud.fillRect(350 + 8*i, canvas.height / 2  + 100 - freqByteData[i], 4, 4);
				}
				requestAnimationFrame(draw);
			}
			requestAnimationFrame(draw);
		});
	}

	preloadSound();
	initFrequency();
});
