//by marcel@q42.nl
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D overlay;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform int scene;

varying highp vec2 vTextureCoord;
varying vec2 p;

vec2 res = vec2(1024.,640.);
float pi = 3.14159265358979323846264;

// voor w00tcamp oculus unrift
const vec2 Scale = vec2(0.1469278, 0.2350845);
const vec2 ScaleIn = vec2(4, 2.5);
const vec4 HmdWarpParam = vec4(1, 0.25, 0.25, 0);

const vec2 LeftScreenCenter = vec2(0.25, 0.5);
const vec2 RightScreenCenter = vec2(0.75, 0.5);

// Scales input texture coordinates for distortion.
vec2 HmdWarp(vec2 in01, vec2 LensCenter) {
	 vec2 theta = (in01 - LensCenter) * ScaleIn;
	 float rSq = length(theta);
	 vec2 rvector = theta * (HmdWarpParam.x + HmdWarpParam.y * rSq +
			HmdWarpParam.z * rSq * rSq +
			HmdWarpParam.w * rSq * rSq * rSq);
	 return LensCenter + Scale * rvector;
}
//shader scene 1
vec4 bla(vec4 color){
	return vec4(1.,0.,0.,1.);
}

void main() {
	bool left = (gl_FragCoord.x < res.x/2.0);
	vec2 ScreenCenter = left ? LeftScreenCenter : RightScreenCenter;
	vec2 otc = gl_FragCoord.xy / res;

	vec4 col;

	//warp that shit
	vec2 tc = HmdWarp(otc, ScreenCenter);

	//todo - better area clamping
	if (!(any(bvec2(clamp(tc,ScreenCenter-vec2(0.25,0.5), ScreenCenter+vec2(0.25,0.5)) - tc))))
	{
		vec2 dp;

		if(left) {
			dp = vec2(tc.x+0.25,tc.y);
			col = texture2D(tex1,dp);
		}
		else {
			dp = vec2(tc.x-0.25,tc.y);
			col = texture2D(tex2,dp);
		}

		vec4 ol = texture2D(overlay,dp);
		col=ol+col*(1.-ol.a);

		if(scene==1) {
			col = bla(col);
		}

		gl_FragColor = col;
	}
	// black out clamp
	else gl_FragColor = vec4(0.,0.,0.,0.);
}
