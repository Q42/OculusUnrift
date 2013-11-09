var speech = new (function () {
  var _recognition = null;

  var _finalEvents = {};
  var _interimEvents = {};


  function onSpeechResult(event) {
    //console.log(event);
    var recognized = false;
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalSpeech = event.results[i][0].transcript;
        console.log('final', i + ":" + finalSpeech);
        $.each(_finalEvents, function (k, v) {
          if (finalSpeech.indexOf(k) !== -1) {
            v(finalSpeech);
          }
        });
      } else {
        interimSpeech = event.results[i][0].transcript;
        console.log('interim',i + ":" + interimSpeech);
        $.each(_interimEvents, function (k, v) {
          if (interimSpeech.indexOf(k) !== -1) {
            v(interimSpeech);
          }
        });
      }
    }
    if (recognized) {
      _recognition.stop();
      _recognition.start();
    }
  }

  function init() {
    _recognition = new webkitSpeechRecognition();
    _recognition.continuous = true;
    _recognition.interimResults = true;
    _recognition.lang = 'en-US';
    //_recognition.lang = 'nl-NL';
    //_recognition.lang = 'he-HE';
    _recognition.onstart = function () {
      console.log('Speech recognition started');
    };
    _recognition.onerror = function (event) {
      interimSpeech = 'Speech recognition error';
      console.log(interimSpeech, event);
    };
    _recognition.onend = function () {
      interimSpeech = 'Speech recognition ended';
      console.log(interimSpeech);
      setTimeout(init, 3000);
    };

    _recognition.onresult = onSpeechResult;

    _recognition.start();
  }

  this.addFinalEvent = function (word, callback) {
    _finalEvents[word] = callback;
  };
  this.removeFinalEvent = function (word) {
    delete _finalEvents[word];
  };

  this.addInterimEvent = function (word, callback) {
    _interimEvents[word] = callback;
  };
  this.removeInterimEvent = function (word) {
    delete _interimEvents[word];
  };

  this.start = function () {
    if (_recognition !== null) return;
    init();
  };

  this.stop = function () {
    if (_recognition === null) return;
    _recognition.stop();
    _recognition = null;
  }

})();
