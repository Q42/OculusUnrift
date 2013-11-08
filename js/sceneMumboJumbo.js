var sceneMumboJumbo = function(){
	var fps = 30;
	var frame = 0;
	var time = 1000/fps;

	var text_index = 0;
	var char_index = 0;
	var texts = ['initializing boot sequence...', 'deleting all files...', 're-allocating memory...'];
	var blurp = '';
	var flicker = 0;

	function setText(txt){
		hud.font = '9pt "visitor_tt1_brkregular" normal';
		hud.fillStyle = '#ffffff';
		hud.textAlign = 'center';
		hud.fillText(txt, center_x, 100);
	}
	

	function draw() {
		setTimeout(function() {
	        frame++;
	        if(frame>fps) frame = 1;

		    // Clear the canvas
		    hud.clearRect(0, 0, canvas.width, canvas.height);

			//hud.font = '12pt "visitor_tt1_brkregular" normal';
			//hud.fillStyle = '#ffffff';
			//hud.textAlign = 'center';
		    //hud.fillText(frame, 490, 460);
		    flicker = flicker == 0 ? 0.2 : 0;
		    if(char_index == texts[text_index].length-1) flicker = 0;
		    hud.fillStyle = 'rgba(255,0,0,'+flicker+')';
			hud.fillRect(0, 0, 512, 480);


		    blurp += texts[text_index].charAt(char_index);
		    createjs.Sound.play('sounds/blip.mp3');

			char_index += 1;

			setText(blurp);
		    
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
