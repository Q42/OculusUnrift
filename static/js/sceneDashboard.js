// ========= SCENE BOOT

var sceneDashboard = function(callback) {
	end_x = canvas.width/2;
	end_y = canvas.height/2;
	var horizontal_moves = [end_x+300,end_x-300, end_x+250, end_x-180, end_x+120, end_x-100, end_x+80,end_x];
	var vertical_moves = [end_y+300,end_y-300, end_y+250, end_y-180, end_y+120, end_y-100, end_y+80,end_y];
	var move_index = 0;
	var x = 0;
	var y = 0;
	var dir = 10;

	var curr_pos = [];

	var arc_init = false;
	var end_r = 25;
	var r = 1;
	var r_max = [60, 40, 50, 30, 40, 30, 35, 25, 30, end_r];
	var r_index = 0;
	var r_dir = 1;

	var end = false;

	function initLines(){
		
		if((dir > 0 && x<horizontal_moves[move_index]) || (dir < 0 && x>horizontal_moves[move_index])){
			x += dir;
			y += dir;
		} else if(move_index<horizontal_moves.length-1) {
			move_index++;
			dir = -dir;
		}else{
			arc_init = true;
		}
		if(arc_init){
			if((r_dir > 0 && r < r_max[r_index]) || (r_dir < 0 && r > r_max[r_index])){
				r += r_dir;
			} else if(r_index < r_max.length-1){
				r_index++;
				r_dir = -r_dir;
			}else{
				end = true;
			}
		}
		if(end) trackSpot();
		else drawLines(x,y,r);
		
		requestAnimationFrame(initLines);
	}

	var step = 5;

	function trackSpot(er){
		var this_x = curr_pos[0]<end_x ? curr_pos[0]+step : curr_pos[0]-step;
		var this_y = curr_pos[1]<end_y ? curr_pos[1]+step : curr_pos[1]-step;
		if(this_x>end_x-step-4 && this_x<end_x+step+4) this_x = end_x;
		if(this_y>end_y-step-4 && this_y<end_y+step+4) this_y = end_y;
		
		drawLines(this_x,this_y,end_r);
	}

	function drawLines(ex,ey,er){
		//console.log('drawing');
		hud.clearRect(0, 0, canvas.width, canvas.height);

		hud.shadowColor = "rgba(255,255,255,0.5)";
		hud.shadowOffsetX = hud.shadowOffsetY = 0;
		hud.shadowBlur = 5;
		hud.beginPath();
		hud.moveTo(ex,0);
		hud.lineTo(ex,canvas.height);
		hud.lineWidth = 1;
		hud.strokeStyle = "rgba(255,255,255,1)";
		hud.stroke();

		hud.beginPath();
		hud.moveTo(0,ey);
		hud.lineTo(canvas.width,ey);
		hud.lineWidth = 1;
		hud.strokeStyle = "rgba(255,255,255,1)";
		hud.stroke();

		if(arc_init){
			hud.beginPath();
			hud.arc(ex, ey, er, 0, 2 * Math.PI, false);
			hud.strokeStyle = 'rgba(255,255,255,1)';
			hud.stroke();
		}
		curr_pos = [ex,ey];
	}
	initLines();
};