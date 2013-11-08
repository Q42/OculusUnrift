var scenePrinting = function(callback) {
	hud.clearRect(0, 0, canvas.width, canvas.height);

	hud.fillStyle = '#ffffff';
	hud.textAlign = 'center';
    hud.fillText('scene printing...', center_x, center_y);
	showFrequency = true;
	
	setTimeout(function() {
		showFrequency = false;
		callback();
	}, 5000);
};