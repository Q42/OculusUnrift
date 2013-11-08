//by marcel@q42.nl
#ifdef GL_ES
precision highp float;
#endif
varying vec2 p;
uniform float time;
uniform vec2 mouse;
uniform float sine_amp;
uniform float tp;
float w = 320.;
float h = 240.;
float pi = 3.14159265358979323846264;

void main() {
  gl_FragColor = vec4(gl_FragCoord.x/w,0.,gl_FragCoord.y/h,1.);
  //gl_fragColor = texture2D(tex1,gl_FragCoord);
}
