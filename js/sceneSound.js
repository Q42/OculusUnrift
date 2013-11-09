var sceneSound = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	hud.fillStyle = '#ffffff';
	hud.textAlign = 'center';
    hud.font = '20pt "visitor_tt1_brkregular" normal';
	
	var interimSpeech = '';
	var finalSpeech = '';
	var analyser;
	var freqByteData;
	var running = true;
	var picture = null;
	var pictureSize;

	initFrequency();


  var voiceCommands = {
    'find': function () {
      nextScene();
    },
    'picture': function () {
    createjs.Sound.play('sounds/picture.mp3');
      console.log('pic!');
      hud.drawImage(streams[0].video, 0, 0, canvas.width, canvas.height);
      picture = new Image();
      picture.setAttribute('src', canvas.toDataURL('image/png'));
      pictureSize = 2;
    }
  };

  $.each(voiceCommands, function (k,v) {
    speech.addEvent(k,v);
  });

  speech.setStreamListener(function(text) {
    interimSpeech = text;
    draw();
  });


  function initFrequency() {
		navigator.webkitGetUserMedia({audio:true}, function(stream) {
			var audioContext = new webkitAudioContext();
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			var mediaStreamSource = audioContext.createMediaStreamSource(stream);
			mediaStreamSource.connect(analyser);
			freqByteData = new Uint8Array(analyser.frequencyBinCount / 4);

			draw();
		});
	}

	function draw() {
		if (!running) {
			return;
		}
		hud.clearRect(0, 0, canvas.width, canvas.height);

		if (picture != null) {
			hud.drawImage(picture, canvas.width, 0,
				-canvas.width * Math.min(pictureSize, 1),
				canvas.height * Math.min(pictureSize, 1));
			pictureSize -= 0.02;
			if (pictureSize <= 0) {
				picture = null;
				interimSpeech = '';
				finalSpeech = '';
			}
		} else {
			// Frequency
			analyser.getByteFrequencyData(freqByteData);
			hud.fillStyle = 'rgba(255, 255, 255, .3)';
			for (var i = 0; i < freqByteData.length; i++) {
				hud.fillRect(300 + 8*i, canvas.height/2 + 100, 4, -1 * freqByteData[i]);
				//hud.fillRect(350 + 8*i, canvas.height / 2  + 100 - freqByteData[i], 4, 4);
			}

			// Speech
			//hud.fillText(finalSpeech, center_x, center_y);
			hud.fillText(interimSpeech, center_x, center_y+150);
		}

		requestAnimationFrame(draw);
	}

	function nextScene() {
		if (!running) return;
		running = false;
    speech.setStreamListener(null);
    $.each(voiceCommands, function (k) {
      speech.removeEvent(k);
    });

		callback();
	}
};