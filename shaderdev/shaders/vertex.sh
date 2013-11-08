attribute vec2 pos;
varying vec2 p;

void main(){
	gl_Position = vec4(pos.x,pos.y,0.0,1.0);
	p = pos;
}
