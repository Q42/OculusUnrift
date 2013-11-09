var sceneMumboJumbo = function(callback){
	var fps = 30;
	var frame = 0;
	var time = 1000/fps;

	var text_index = 0;
	var char_index = 0;
	var texts = ['initializing boot sequence...', 'deleting all files...', 're-allocating memory...'];
	var blurp = '';
	var flicker = 0;
	//createjs.Sound.play('sounds/checklist.mp3');
	//console.log("PLLAY");

	function setText(txt){
		hud.font = '16pt "visitor_tt1_brkregular" normal';
		hud.fillStyle = '#ffffff';
		hud.textAlign = 'center';
		hud.fillText(txt, center_x, center_y-8);
		//hud.lineWidth = 1;
      	//hud.strokeStyle = 'blue';
      	//hud.strokeText(txt, center_x, 200);
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
		    flicker = flicker == 0 ? 0.1 : 0;
		    if(char_index == texts[text_index].length-1) flicker = 0;
		    hud.fillStyle = 'rgba(100,0,0,'+flicker+')';
			hud.fillRect(0, 0, canvas.width, canvas.height);

				character = texts[text_index].charAt(char_index)
		    blurp += character;
		    if (character != ' ') createjs.Sound.play('sounds/bipone.mp3', {volume:0.5});

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
					setTimeout(function() {
						createjs.Sound.play('sounds/online.mp3');
						callback();
					}, 2500);
				}
				
			}else{
				draw();
			}
	    }, time);
	}
	setTimeout(draw,100);
};
