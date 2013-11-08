function Camera(id){
	var _el = document.getElementById(id)
		, raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame
		, shaders = {}
		;

	var gl = _el.getContext("experimental-webgl");
	gl.viewportWidth = _el.width;
	gl.viewportHeight = _el.height;

	var shader = gl.createProgram();
	addShader('shaders/vertex.sh','vertex');
	addShader('shaders/fragment.sh','fragment');

	var quad = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, quad);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.,-1.,1.,-1.,-1.,1.,1.,-1.,1.,1.,-1.,1.]), gl.STATIC_DRAW);

	function init(){
		if(!shaders['vertex'] || !shaders['fragment']) return;
		gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		gl.clearColor(0,0,0,0);
		gl.viewport(0,0,1024,1024);
		gl.linkProgram(shader);
		drawFrame();
	};

	function addShader(uri,type){
		$.get(uri,function(res){
			var sh=gl.createShader(type=='fragment'?gl.FRAGMENT_SHADER:gl.VERTEX_SHADER)
			gl.shaderSource(sh,res);
			gl.compileShader(sh);
			if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
				console.error('Shader Syntax Error in ['+uri+']:\n'+gl.getShaderInfoLog(shader));
			shaders[type]=sh;
			gl.attachShader(shader,sh);
			init();
		});
	};

	function drawFrame(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(shader);

		var pos = gl.getAttribLocation(shader, "pos");

		gl.bindBuffer(gl.ARRAY_BUFFER, quad);
		gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(pos);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		gl.disableVertexAttribArray(pos);
	};

};
