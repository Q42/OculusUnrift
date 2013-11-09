var scenePrinting = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	hud.fillStyle = '#ffffff';
	hud.textAlign = 'center';
    hud.font = '20pt "visitor_tt1_brkregular" normal';
	
	var interimSpeech = '';
	var finalSpeech = '';
	var analyser;
	var freqByteData;
	var shouldDraw = true;
	var picture = null;
	var pictureSize;

	initSpeech();
	initFrequency();

	function initSpeech() {
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = 'en-US';
		//recognition.lang = 'nl-NL';
		//recognition.lang = 'he-HE';
		recognition.onstart = function() {
			console.log('Speech recognition started');
		};
		recognition.onerror = function(event) {
			interimSpeech = 'Speech recognition error';
			console.log(interimSpeech, event);
		};
		recognition.onend = function() {
			interimSpeech = 'Speech recognition ended';
			console.log(interimSpeech);
			setTimeout(nextScene, 3000);
		};
		recognition.onresult = function(event) {
			//console.log(event);
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					finalSpeech = event.results[i][0].transcript;
					console.log('final', finalSpeech);
					if (finalSpeech.indexOf('picture') !== -1) {
						console.log('pic!');
						hud.drawImage(streams[0].video, 0, 0, canvas.width, canvas.height);
						picture = new Image();
						picture.setAttribute('src', canvas.toDataURL('image/png'));
						pictureSize = 2;
					} else if (finalSpeech.trim() == 'next') {
						nextScene();
					}
				} else {
					interimSpeech = event.results[i][0].transcript;
					console.log('interim', interimSpeech);
				}
			}
		};
		recognition.start();
	}

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
		hud.clearRect(0, 0, canvas.width, canvas.height);
		if (!shouldDraw) {
			return;
		}

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
			hud.fillStyle = 'rgba(255, 255, 255, 0.1)';
			for (var i = 0; i < freqByteData.length; i++) {
				hud.fillRect(300 + 8*i, canvas.height/2 + 100, 1, -1 * freqByteData[i]);
				//hud.fillRect(350 + 8*i, canvas.height / 2  + 100 - freqByteData[i], 4, 4);
			}

			// Speech
			//hud.fillText(finalSpeech, center_x, center_y);
			hud.fillText(interimSpeech, center_x, center_y+150);
		}

		requestAnimationFrame(draw);
	}

	function nextScene() {
		shouldDraw = false;
		callback();
	}
};