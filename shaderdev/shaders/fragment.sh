//by marcel@q42.nl
#ifdef GL_ES
precision highp float;
#endif
uniform float time;
uniform vec2 mouse;
uniform float sine_amp;
uniform float tp;
uniform sampler2D tex;

varying highp vec2 vTextureCoord;
varying vec2 p;

float w = 320.;
float h = 160.;
float pi = 3.14159265358979323846264;

void main() {
  gl_FragColor = texture2D(tex,vec2(gl_FragCoord.x/w,1.-gl_FragCoord.y/h));
}
