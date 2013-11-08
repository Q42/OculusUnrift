// ========= SCENE BOOT
var sceneDashboard = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var meter = new Image();
	meter.onload = function() {
		hud.save();
    	hud.globalAlpha = 0.4;
		hud.drawImage(meter, canvas.width/2-50, canvas.height/2,100,42);
		hud.restore();
	};
	meter.src = '/img/meter.png';

	var needle = new Image();
	needle.onload = function() {
		hud.save();
    	hud.globalAlpha = 0.4;
		hud.drawImage(needle, canvas.width/2, canvas.height/2-20,20,90);
		hud.restore();
	};
	needle.src = '/img/needle.png';
  setTimeout(callback, 8000);
};