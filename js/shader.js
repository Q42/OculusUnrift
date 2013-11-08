var shaderScene = 0;

function Camera(){
	var _el = document.getElementById('cam')
		, inited = false
		, shaders = {}
		, cams = []
		, texAttr = null
		, pos = null
		;
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

	var overlay = gl.createTexture();
	initTexture(0,overlay);

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
		if(inited || !shaders['vertex'] || !shaders['fragment']) return;
		inited = true;
		gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		gl.clearColor(0,0,0,0);
		gl.viewport(0,0,1024,640);
		gl.linkProgram(shader);
		pos = gl.getAttribLocation(shader, "pos");
		texAttr = gl.getAttribLocation(shader, "aTextureCoord");
	};

	function initTexture(num,texture){
		gl.activeTexture(gl['TEXTURE'+num]);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	};

	function drawTexture(num,name,texture,item) {
		gl.activeTexture(gl['TEXTURE'+num]);
		gl.uniform1i(gl.getUniformLocation(shader, name), num);
		gl.enableVertexAttribArray(texAttr);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, item);
		gl.disableVertexAttribArray(texAttr);
	};

	this.addStream = function(cam,num){
		cam.num = num;
		cam.texture = gl.createTexture();
		initTexture(num,cam.texture);
		cams.push(cam);
	};

	this.draw = function(){
		if(!inited) return;
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(shader);

		gl.uniform1i(gl.getUniformLocation(shader, 'scene'), shaderScene);

		drawTexture(0,'overlay',overlay,document.getElementById('hud-overlay'));

		for(var i=0;i<cams.length;i++)
			drawTexture(cams[i].num,'tex'+cams[i].num,cams[i].texture,cams[i])

		gl.bindBuffer(gl.ARRAY_BUFFER, quad);
		gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(pos);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		gl.disableVertexAttribArray(pos);
	};

};
