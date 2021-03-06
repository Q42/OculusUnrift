var speech = new (function () {
  var _recognition = null;

  var _finalEvents = {};
  var _interimEvents = {};

  var _recognizeEventTimeout = null;
  var _streamListener = null;


  function onSpeechResult(event) {
    //console.log(event);
    var recognized = false;
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (_recognizeEventTimeout)  clearTimeout(_recognizeEventTimeout);
      var isFinal = event.results[i].isFinal;
      var text = event.results[i][0].transcript;
      console.log(isFinal ? 'final' : 'interim', i + ":" + text);
      var events = isFinal ? _finalEvents : _interimEvents;
      if (_streamListener) _streamListener(text);
      $.each(events, function (k, v) {
        if (text.indexOf(k) !== -1) {
          recognized = true;
          v(text);
        }
      });

    }
    if (recognized) {
      _recognition.abort();
    }

    _recognizeEventTimeout = setTimeout(function () { _recognition.abort()}, 1000);
  }

  function init() {
    _recognition = new webkitSpeechRecognition();
    _recognition.continuous = true;
    _recognition.interimResults = true;
    _recognition.lang = 'en-US';
    //_recognition.lang = 'nl-NL';
    //_recognition.lang = 'he-HE';
    _recognition.onstart = function () {
      //console.log('Speech recognition started');
    };
    _recognition.onerror = function (event) {
      interimSpeech = 'Speech recognition error';
      //console.log(interimSpeech, event);
    };
    _recognition.onend = function () {
      interimSpeech = 'Speech recognition ended';
      //console.log(interimSpeech);
      _recognition.start();
    };

    _recognition.onresult = onSpeechResult;

    _recognition.start();
  }

  this.addEvent  = function (word, callback) {
    _finalEvents[word] = callback;
    _interimEvents[word] = callback;
  };

  this.removeEvent = function (word) {
    delete _finalEvents[word];
    delete _interimEvents[word];
  };

  this.setStreamListener = function(callback) {
    _streamListener = callback;
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
