// ========= SCENE CURSOR
var sceneCursor = function(){
	// global var hud references to canvas.getContext("2d")

	var color = 255;
	function fadeOut() {
		color--;
		hud.fillStyle = 'rgb('+color+','+color+','+color+')';
		hud.fillRect(0, 0, 512, 480);
		if (color>0) {
			setTimeout(fadeOut, 10);
		} else {
			showCursor();
		}
	}
	fadeOut();

	var blinkCount = 0;
	function showCursor() {
		blinkCount++;
    	if (blinkCount < 10) {
    		if (blinkCount % 2 == 0) {
	    		hud.fillStyle = 'rgb(255,255,255)';
	    		hud.fillText('█', 200, 220);
	    	} else {
	    		hud.fillStyle = 'rgb(0,0,0)';
	    		hud.fillRect(0, 0, 512, 480);
	    	}
    		setTimeout(showCursor, 500);
    	} else {
    		sceneMumboJumbo();
    	}
	}
}
