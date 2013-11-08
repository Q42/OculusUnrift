/* ===== CANVAS 2D */
$(function(){
	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	canvas_width = canvas.width;
	canvas_height = canvas.height;

	center_x = canvas.width/2;
	center_y = canvas.height/2;

	hud.fillStyle = '#000';
	hud.fillRect(0, 0, canvas.width, canvas.height);

  Mousetrap.bind('space', function() {
    director.start();
  });

  Mousetrap.bind('r', function() {
    director.replayToggle();
  });


  Mousetrap.bind('1', function() {
    streams[0].toggleSource();
  });

  Mousetrap.bind('2', function() {
    streams[1].toggleSource();
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
	}

	function initFrequency() {
		navigator.webkitGetUserMedia({audio:true}, function(stream) {
			var audioContext = new webkitAudioContext();
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			var mediaStreamSource = audioContext.createMediaStreamSource(stream);
			mediaStreamSource.connect(analyser);
			var freqByteData = new Uint8Array(analyser.frequencyBinCount / 4);

			function draw() {
				if (!window.showFrequency) {
					requestAnimationFrame(draw);
					return;
				}
				analyser.getByteFrequencyData(freqByteData);
				hud.clearRect(0, 0, canvas.width, canvas.height);
				hud.fillStyle = 'rgba(255, 255, 255, 0.1)';
				for (var i = 0; i < freqByteData.length; i++) {
					hud.fillRect(300 + 8*i, canvas.height/2 + 100, 10, -1 * freqByteData[i]);
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
