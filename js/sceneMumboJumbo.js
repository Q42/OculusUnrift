var sceneMumboJumbo = function(){
	var fps = 30;
	var frame = 0;
	var time = 1000/fps;

	var text_index = 0;
	var char_index = 0;
	var texts = ['initializing boot sequence...', 'all your base are belong to us', 'fading out...'];
	var blurp = '';
	var hold = 30;

	function draw() {
		setTimeout(function() {
	        frame++;
	        if(frame>fps) frame = 1;

		    // Clear the canvas
		    hud.clearRect(0, 0, canvas.width, canvas.height);

		    // Drawing code goes here... for example updating an 'x' position:
		    //hud.globalAlpha = 0.4;
			//hud.fillStyle = 'rgba(255,0,0,0.1)';
			//hud.fillRect(0, 0, 640, 480);

			hud.font = '12pt "visitor_tt1_brkregular" normal';
			hud.fillStyle = '#ffffff';
		    hud.fillText(frame, 490, 460);

		    blurp += texts[text_index].charAt(char_index);
		    createjs.Sound.play('sounds/blip.mp3');
			char_index += 1;

			hud.font = '9pt "visitor_tt1_brkregular" normal';
			hud.fillStyle = '#ffffff';
		    hud.fillText(blurp, 50, 100);
		    if(char_index == texts[text_index].length) {
	    		char_index = 0;
				if(text_index<texts.length-1){
					text_index++;
					blurp = '';
					setTimeout(draw,2500);
				}
				else {
					setTimeout(scenePrinting,2500);
				}
				
			}else{
				draw();
			}
	    }, time);
	}
	setTimeout(draw,100);
}
