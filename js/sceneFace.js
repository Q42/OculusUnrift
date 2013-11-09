var sceneFace = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var htracker = new headtrackr.Tracker();
	htracker.init(streams[0].video, canvas);
	htracker.start();

	document.addEventListener('headtrackrStatus', function (event) {
		//console.log(event);
	});
	document.addEventListener('facetrackingEvent', function(event) {
		//console.log(event.x, event.y);
		hud.beginPath();
		hud.moveTo(event.x - 20, event.y);
		hud.lineTo(event.x + 20, event.y);
		hud.moveTo(event.x, event.y - 25);
		hud.lineTo(event.x, event.y + 25);
		hud.lineWidth = 2;
		hud.strokeStyle = 'red';
		hud.stroke();
	}, false);
	document.addEventListener('headtrackingEvent', function(event) {
		//console.log(event.z);
	}, false);

	setTimeout(function() {
		htracker.stop();
		callback();
	}, 10000);
};
