var sceneFace = function(callback) {
	end_x = canvas.width/2;
	end_y = canvas.height/2;

	hud.clearRect(0, 0, canvas.width, canvas.height);

	var curr_pos = [0,0];
	var end_r = 25;
	var step = 25;

	function trackSpot(){
		var this_x = curr_pos[0]<end_x ? curr_pos[0]+step : curr_pos[0]-step;
		var this_y = curr_pos[1]<end_y ? curr_pos[1]+step : curr_pos[1]-step;
		if(this_x>end_x-step-4 && this_x<end_x+step+4) this_x = end_x;
		if(this_y>end_y-step-4 && this_y<end_y+step+4) this_y = end_y;
		
		drawLines(this_x,this_y,end_r);
		requestAnimationFrame(trackSpot);
	}

	function drawLines(ex,ey,er){
		console.log('drawing');
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

		hud.beginPath();
		hud.arc(ex, ey, er-5, 0, 2 * Math.PI, false);
		hud.strokeStyle = 'rgba(255,255,255,1)';
		hud.stroke();

		hud.beginPath();
		hud.arc(ex, ey, er+5, 0, 2 * Math.PI, false);
		hud.strokeStyle = 'rgba(255,255,255,1)';
		hud.stroke();

		curr_pos = [ex,ey];
	}

	var htracker = new headtrackr.Tracker({ui : false});

	var c = document.createElement('canvas');
	c.width = canvas.width;
	c.height = canvas.height;

	htracker.init(streams[0].video, c);
	htracker.start();

	document.addEventListener('headtrackrStatus', function (event) {
		if (event.status == "found") {
	    	camera.toggleHighlight();
	    	setTimeout(trackSpot, 1);
	    }
	});
	document.addEventListener('facetrackingEvent', function(event) {
		end_x = event.x;
		end_y = event.y;
	}, false);
	document.addEventListener('headtrackingEvent', function(event) {
		//console.log(event.z);
	}, false);

	/*setTimeout(function() {
		htracker.stop();
		callback();
	}, 10000);*/
};
