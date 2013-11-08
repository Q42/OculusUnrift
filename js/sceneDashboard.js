// ========= SCENE BOOT
var sceneDashboard = function(){
	// global var hud references to canvas.gethud("2d")
	
	// To skip this scene:
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var imageObj = new Image();

	imageObj.onload = function() {
		hud.save();
    	hud.globalAlpha = 0.4;
		hud.drawImage(imageObj, canvas.width/2-50, canvas.height/2,100,42);
		hud.restore();
	};
	imageObj.src = '/img/meter.png';

	setTimeout(sceneBoot,8000);
}