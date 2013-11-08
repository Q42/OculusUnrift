// ========= SCENE BOOT
var sceneBoot = function(){
	// global var hud references to canvas.getContext("2d")
	
	// To skip this scene:
	//sceneCursor();
	//return;

	hud.fillStyle = '#fff';
	hud.fillRect(0, 0, 1024, 960);

	hud.font = '20pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#000';
	hud.textAlign = 'center';
    hud.fillText('scene boot...', center_x, center_y);

    //createjs.Sound.play('sounds/robotpoweron.mp3');

	//setTimeout(sceneCursor,2000);
	setTimeout(sceneCursor,2000);
}