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
			console.log('Speech recognition error', event)
		};
		recognition.onend = function() {
			console.log('Speech recognition ended');
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
						setTimeout(function() {
							picture = null;
							interimSpeech = '';
							finalSpeech = '';
						}, 2000);
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
			hud.drawImage(picture, 0, 0, canvas.width, canvas.height);
		} else {
			// Frequency
			analyser.getByteFrequencyData(freqByteData);
			hud.fillStyle = 'rgba(255, 255, 255, 0.1)';
			for (var i = 0; i < freqByteData.length; i++) {
				hud.fillRect(300 + 8*i, canvas.height/2 + 100, 10, -1 * freqByteData[i]);
				//hud.fillRect(350 + 8*i, canvas.height / 2  + 100 - freqByteData[i], 4, 4);
			}

			// Speech
			//hud.fillText(finalSpeech, center_x, center_y);
			hud.fillText(interimSpeech, center_x, center_y+150);
		}

		requestAnimationFrame(draw);
	}

	setTimeout(function() {
		shouldDraw = false;
		callback();
	}, 50000);
};