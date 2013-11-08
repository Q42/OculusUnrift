// ========= SCENE BOOT
var sceneBoot = function(callback) {
	hud.fillStyle = '#000';
	hud.fillRect(0, 0, canvas.width, canvas.height);

	hud.font = '20pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#fff';
	hud.textAlign = 'center';
  hud.fillText('Unrift', center_x, center_y);

  createjs.Sound.play('sounds/macstartup.mp3').addEventListener("complete", callback);
};
