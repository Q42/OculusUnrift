// ========= SCENE BOOT
var sceneDashboard = function(){
	// global var hud references to canvas.getContext("2d")
	
	// To skip this scene:
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var imageObj = new Image();

	imageObj.onload = function() {
		context.drawImage(imageObj, 0, 0);
	};
	imageObj.src = '';

    //createjs.Sound.play('sounds/robotpoweron.mp3');

	setTimeout(sceneCursor,2000);
}