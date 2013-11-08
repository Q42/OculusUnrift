// ========= SCENE CURSOR
var sceneCursor = function(){
	// global var hud references to canvas.getContext("2d")
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);

	hud.font = '24pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#ffffff';
    hud.fillText('scene cursor...', 200, 220);
	setTimeout(sceneMumboJumbo,1000);
}