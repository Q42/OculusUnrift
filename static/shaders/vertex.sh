attribute vec2 pos;
attribute vec2 aTextureCoord;
varying highp vec2 vTextureCoord;
varying vec2 p;

void main(){
	gl_Position = vec4(pos.x,pos.y,0.0,1.0);
	vTextureCoord = aTextureCoord;
	p = pos;
}
