// ========= SCENE BOOT
var sceneDashboard = function(){
	// global var hud references to canvas.gethud("2d")
	
	// To skip this scene:
	// Clear the canvas
	hud.clearRect(0, 0, canvas.width, canvas.height);

	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = Math.PI;
	var startAngle = 1.1 * Math.PI;
	var endAngle = 1.9 * Math.PI;
	var counterClockwise = false;
	// begin custom shape
	hud.beginPath();

	hud.beginPath();
    hud.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    hud.lineWidth = 15;


	// complete custom shape
	hud.strokeStyle = 'red';
    hud.stroke();


	setTimeout(sceneCursor,2000);
}