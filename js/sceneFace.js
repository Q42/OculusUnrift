var sceneFace = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var htracker = new headtrackr.Tracker();
	htracker.init(streams[0].video, canvas);
	htracker.start();

	var headZ = 0;

	document.addEventListener('headtrackrStatus', function (event) {
		//console.log(event);
	});
	document.addEventListener('facetrackingEvent', function(event) {
		//console.log(event.x, event.y);
		hud.beginPath();
		var size = 200 - headZ;
		hud.rect(event.x - size / 2, event.y - size / 2, size, size);
		hud.lineWidth = 5;
		hud.strokeStyle = 'red';
		hud.stroke();
	}, false);
	document.addEventListener('headtrackingEvent', function(event) {
		headZ = event.z;
		//console.log(headZ);
	}, false);

	setTimeout(function() {
		htracker.stop();
		callback();
	}, 10000);
};