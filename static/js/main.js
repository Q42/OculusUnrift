/* ===== CANVAS 2D */

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

$(function(){

  speech.start();

	canvas = document.getElementById("hud-overlay");
	hud = canvas.getContext("2d");

	canvas_width = canvas.width;
	canvas_height = canvas.height;

	center_x = canvas.width/2;
	center_y = canvas.height/2;

	end_x = 0;
	end_y = 0;

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

	Mousetrap.bind('x', function() {
		camera.toggleOverlay();
	});

	Mousetrap.bind('z', function() {
		camera.toggleDemoMode();
	});

  Mousetrap.bind('h', function() {
    camera.toggleHighlight();
  });

  var lightsOn = true;

  var voiceCommands = {
    'light': function () {
      createjs.Sound.play('sounds/affirmative.mp3');
      Lights.send('PUT', '/groups/0/action', { on: lightsOn });
      lightsOn = !lightsOn;
    },
    /*
    'lights off': function () {
      createjs.Sound.play('sounds/affirmative.mp3');
      Lights.send('PUT', '/groups/0/action', { on: false });
    },
    */
    'start': function () {
      director.start();
    },
    'begin': function () {
      director.start();
    },
    'initialize': function () {
      director.start();
    }

  };

  $.each(voiceCommands, function (k,v) { speech.addEvent(k,v); });



  var scene = getURLParameter('scene');
	if (scene !== null) {
		director.setScene(scene);
		director.start();
	}

  	function preloadSound() {
		var manifest = [
			{ id: 'boot', src: 'sounds/robotpoweron.mp3' },
			{ id: 'blip', src: 'sounds/blip.mp3' },
      { id: 'picture', src: 'sounds/picture.mp3' },
			{ id: 'startup', src: 'sounds/macstartup.mp3' },
      { id: 'checklist', src: 'sounds/online.mp3' },
      { id: 'affirmative', src: 'sounds/affirmative.mp3' },
			{ id: 'bips', src: 'sounds/bipone.mp3' },
      { id: 'explosion', src: 'sounds/explosion-02.mp3' }
		];
		createjs.Sound.addEventListener('fileload', handleLoad);
		createjs.Sound.registerManifest(manifest);
		function handleLoad(event) {
			console.log('loaded ' + event.src);
		}
	}

	preloadSound();
});
