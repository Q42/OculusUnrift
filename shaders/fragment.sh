//by marcel@q42.nl
#ifdef GL_ES
precision highp float;
#endif
uniform float time;
uniform vec2 mouse;
uniform float sine_amp;
uniform float tp;
uniform sampler2D tex;

vec2 res = vec2(640.,480.);

varying highp vec2 vTextureCoord;
varying vec2 p;

float pi = 3.14159265358979323846264;

void main() {
	vec2 u = gl_FragCoord.xy/res.xy;
	vec4 nice = vec4(u.x,0.,u.y,1.);
	gl_FragColor = nice*texture2D(tex,u);
}
