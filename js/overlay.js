function Overlay() {
	this.canvas = document.getElementById('overlay');
	var ctx = this.canvas.getContext('2d');
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(10,10,200,200);
	ctx.fillStyle = '#00ff00';
	ctx.fillRect(0,0,200,200);
	ctx.fillStyle = '#0000ff';
	ctx.fillRect(-10,-10,200,200);
};
