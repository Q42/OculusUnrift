// ========= SCENE BOOT
var sceneBoot = function(){
	// global var hud references to canvas.getContext("2d")
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);

	hud.font = '24pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#ffffff';
    //hud.fillText('scene boot...', 200, 220);

    createjs.Sound.play('sounds/robotpoweron.mp3');

	setTimeout(sceneCursor,8000);
}