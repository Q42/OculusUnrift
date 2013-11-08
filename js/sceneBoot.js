// ========= SCENE BOOT
var sceneBoot = function(){
	// global var hud references to canvas.getContext("2d")
	
	// To skip this scene:
	//sceneCursor();
	//return;

	hud.fillStyle = '#000';
	hud.fillRect(0, 0, canvas.width, canvas.height);

	hud.font = '12pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#fff';
    hud.fillText('Unrift', 200, 220);

    createjs.Sound.play('sounds/robotpoweron.mp3');

	setTimeout(sceneCursor, 2000);
}