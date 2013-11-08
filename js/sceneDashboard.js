// ========= SCENE BOOT
var sceneDashboard = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var TO_RADIANS = Math.PI/180;

	var meter = new Image();
	/*meter.onload = function() {
		hud.save();
    	hud.globalAlpha = 0.4;
		hud.drawImage(meter, canvas.width/2-50, canvas.height/2,100,42);
		hud.restore();
	};*/
	meter.src = '/img/meter.png';

	var needle = new Image();
	needle.onload = function() {
		draw();
	};
	needle.src = '/img/needle.png';

	rot = 20;
	nex = 300;
	ney = -canvas.height/4;

	var shouldDraw = true;
	function draw() {
		if (!shouldDraw) return;
		hud.clearRect(0, 0, canvas.width, canvas.height);
		hud.drawImage(meter, canvas.width/2-50, canvas.height/2,100,42);
		hud.save();
    	//hud.globalAlpha = 0.4;
    	hud.translate(nex, ney);
		hud.rotate(rot * TO_RADIANS);
		hud.drawImage(needle, canvas.width/2, canvas.height/2, 20, 90);
		hud.restore();
		requestAnimationFrame(draw);
	}

  	setTimeout(function() {
  		shouldDraw = false;
  		callback();
  	}, 8000);
};