// ========= SCENE CURSOR
var sceneCursor = function(){
	// global var hud references to canvas.getContext("2d")
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);
	hud.fillStyle = '#fff';
	hud.fillRect(0, 0, 512, 480);

	var color = 255;
	function fadeOut(){
		color--;
		hud.fillStyle = 'rgb('+color+','+color+','+color+')';
		hud.fillRect(0, 0, 512, 480);
		if(color>0) setTimeout(fadeOut,10);

	}
	fadeOut();


	hud.font = '12pt "visitor_tt1_brkregular" normal';
	hud.fillStyle = '#000';
    hud.fillText('scene cursor...', 200, 220);
	setTimeout(sceneMumboJumbo,3000);
}