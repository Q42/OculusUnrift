function Camera(id){
  var _el = document.getElementById(id)
    , raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame
    , shaders = {}
    ;


	var gl = _el.getContext("experimental-webgl");
	gl.viewportWidth = _el.width;
	gl.viewportHeight = _el.height;
  shaders['vertex'] = addShader('shaders/vertex.sh','vertex');
	
	function init(){
	  console.log('init..',id);
	  //shaders['vertex'] = addShader('vertex.sh','vertex');
	  //shaders['fragment'] = addShader('fragment.sh','fragment');
	};

	function addShader(uri,type){
	  $.get(uri,function(res){
	    console.log('got shader!',type);
	    
	  });
	  
  	/*var shader=gl.createShader(type=='fragment'?gl.FRAGMENT_SHADER:gl.VERTEX_SHADER)
	  console.log('
		if(shaders[uri])return;
		if(!shader)shader = gl.createProgram();
		var newshader=new Shader(uri,type,gl);
		if(newshader.program) {
			gl.attachShader(shader,newshader.program);
			gl.deleteShader(newshader.program);
		}
		else db('Could not load shader '+uri);*/
	};

	function drawFrrame(){
	  console.log('dframe');
	  
	};
};
