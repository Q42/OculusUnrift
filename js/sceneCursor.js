// ========= SCENE CURSOR
var sceneCursor = function(){
	// global var hud references to canvas.getContext("2d")

	// To skip this scene:
	//sceneMumboJumbo();
	//return;

	var blinkCount = 0;
	function showCursor() {
		blinkCount++;
		if (blinkCount < 8) {
			if (blinkCount % 2 == 0) {
				hud.fillStyle = 'rgb(255,255,255)';
				hud.fillText('\u2588', 200, 220);
			} else {
				hud.fillStyle = 'rgb(0,0,0)';
				hud.fillRect(0, 0, canvas.width, canvas.height);
			}
			setTimeout(showCursor, 500);
		} else {
			fadeOut();
		}
	}

	showCursor();

	var alpha = 1;
	function fadeOut() {
		hud.clearRect(0, 0, canvas.width, canvas.height);
		hud.fillStyle = 'rgba(0,0,0,'+alpha+')';
		hud.fillRect(0, 0, canvas.width, canvas.height);
		if (alpha > 0) {
			alpha -= 0.01;
			setTimeout(fadeOut, 50);
		} else {
			sceneMumboJumbo();
		}
	}
}
