// ========= SCENE BOOT
var sceneBoot = function(){
	// global var hud references to canvas.getContext("2d")
	
	// To skip this scene:
	//sceneCursor();
	//return;

	hud.fillStyle = '#fff';
	hud.fillRect(0, 0, 512, 480);

	hud.font = '12pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#000';
	hud.textAlign = 'center';
    hud.fillText('scene boot...', center_x, center_y);

    //createjs.Sound.play('sounds/robotpoweron.mp3');

	setTimeout(sceneCursor,2000);
}