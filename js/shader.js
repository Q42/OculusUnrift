function Camera(num,video){
	var _el = document.getElementById('cam'+num)
		, inited = false
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

	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.activeTexture(gl.TEXTURE0);

	var overlayC = new Overlay(num);
	var overlay = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, overlay);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.activeTexture(gl.TEXTURE1);

	function addShader(uri,type){
		$.get(uri,function(res){
			var sh=gl.createShader(type=='fragment'?gl.FRAGMENT_SHADER:gl.VERTEX_SHADER)
			gl.shaderSource(sh,res);
			gl.compileShader(sh);
			if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
				return console.error('Shader Syntax Error in ['+uri+']:\n',gl.getShaderInfoLog(sh));
			shaders[type]=sh;
			gl.attachShader(shader,sh);
			init();
		});
	};

	function init(){
		if(!shaders['vertex'] || !shaders['fragment']) return;
		inited = true;
		gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		gl.clearColor(0,0,0,0);
		gl.viewport(0,0,640,480);
		gl.linkProgram(shader);
	};

	this.draw = function(){
		if(!inited) return;
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(shader);

		var pos = gl.getAttribLocation(shader, "pos");
		var texAttr = gl.getAttribLocation(shader, "aTextureCoord");

		gl.activeTexture(gl.TEXTURE0);
		gl.enableVertexAttribArray(texAttr);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
		gl.uniform1i(gl.getUniformLocation(shader, 'tex'), 0);
		gl.disableVertexAttribArray(texAttr);

		gl.activeTexture(gl.TEXTURE1);
		gl.enableVertexAttribArray(texAttr);
		gl.bindTexture(gl.TEXTURE_2D, overlay);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, overlayC.canvas);
		gl.uniform1i(gl.getUniformLocation(shader, 'overlay'), 1);
		gl.disableVertexAttribArray(texAttr);

		gl.bindBuffer(gl.ARRAY_BUFFER, quad);
		gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(pos);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		gl.disableVertexAttribArray(pos);
	};

};
