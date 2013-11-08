// ========= SCENE BOOT
var sceneBoot = function(){
	// global var hud references to canvas.getContext("2d")

	hud.fillStyle = 'rgba(0,0,0,1)';
	hud.fillRect(0, 0, 512, 480);

	hud.font = '12pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#ffffff';

    hud.fillText('scene boot...', 200, 220);

    createjs.Sound.play('sounds/robotpoweron.mp3');

	setTimeout(sceneCursor,8000);
}