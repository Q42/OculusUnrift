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

  cursor = new Cursor(center_x-200,center_y-300,6,50, 8, 20);


  var lines = [
    "A long time ago, in a galaxy far, far away...",
    "",
    "It is a period of civil war. Rebel",
    "spaceships, striking from a hidden",
    "base, have won their first victory",
    "against the evil Galactic Empire.",
    "",
    "During the battle, Rebel spies managed",
    "to steal secret plans to the Empire's",
    "ultimate weapon, the Death Star, an",
    "armored space station with enough",
    "power to destroy an entire planet.",
    "",
    "Pursued by the Empire's sinister agents,",
    "Princess Leia races home aboard her",
    "starship, custodian of the stolen plans",
    "that can save her people and restore",
    "freedom to the galaxy..."
  ];

  var currentLine = 0;
  function updateLine() {
    if (currentLine >= lines.length) return;
    cursor.appendLine(lines[currentLine]);
    currentLine++;
    setTimeout(updateLine, 500);
  }

  updateLine();

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
    cursor.appendLine(text);
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

		if (picture != null) {
      cursor.pause();
      hud.clearRect(0, 0, canvas.width, canvas.height);
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
      cursor.unpause();
			// Frequency
      hud.clearRect(0, canvas.height/2 + 100 - 256, canvas.width, 256);

      analyser.getByteFrequencyData(freqByteData);
			hud.fillStyle = 'rgba(255, 255, 255, .3)';
			for (var i = 0; i < freqByteData.length; i++) {
				hud.fillRect(300 + 8*i, canvas.height/2 + 100, 4, -1 * freqByteData[i]);
				//hud.fillRect(350 + 8*i, canvas.height / 2  + 100 - freqByteData[i], 4, 4);
			}

			// Speech
			//hud.fillText(finalSpeech, center_x, center_y);
			//hud.fillText(interimSpeech, center_x, center_y+150);
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