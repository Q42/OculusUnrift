#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D overlay; //canvas2d
uniform sampler2D tex1; //left
uniform sampler2D tex2; //right
uniform bool useOverlay; //which scene
uniform bool useHighlight; //body outline

//for tv stuff
uniform float iGlobalTime;

varying highp vec2 vTextureCoord;
varying vec2 p;

const vec2 res = vec2(1024.,640.);
const float pi = 3.14159265358979323846264;

// voor w00tcamp oculus unrift
const vec2 Scale = vec2(0.1469278, 0.2350845);
const vec2 ScaleIn = vec2(4, 2.5);
const vec4 HmdWarpParam = vec4(1, 0.25, 0.25, 0);

const vec2 LeftScreenCenter = vec2(0.25, 0.5);
const vec2 RightScreenCenter = vec2(0.75, 0.5);
const vec2 LeftOverlayCenter = vec2(0.2863248, 0.5);
const vec2 RightOverlayCenter = vec2(0.7136753, 0.5);

// Scales input texture coordinates for distortion.
vec2 HmdWarp(vec2 in01, vec2 LensCenter) {
	 vec2 theta = (in01 - LensCenter) * ScaleIn;
	 float rSq = length(theta);
	 vec2 rvector = theta * (HmdWarpParam.x + HmdWarpParam.y * rSq +
			HmdWarpParam.z * rSq * rSq +
			HmdWarpParam.w * rSq * rSq * rSq);
	 return LensCenter + Scale * rvector;
}

float hash(in vec2 v) { return fract(sin(v[1])*43758.5453123); }

//tv effect
vec3 tvLeft(vec2 uv, float xOffset) {
  float red   =   texture2D(  tex1,  vec2(uv.x + xOffset -0.005,uv.y)).r;
  float green =   texture2D(  tex1,  vec2(uv.x + xOffset,    uv.y)).g;
  float blue  = texture2D(  tex1,  vec2(uv.x + xOffset +0.005,uv.y)).b;
  return vec3(red,green,blue);
}
vec3 tvRight(vec2 uv, float xOffset) {
  float red   =   texture2D(  tex2,  vec2(uv.x + xOffset -0.005,uv.y)).r;
  float green =   texture2D(  tex2,  vec2(uv.x + xOffset,    uv.y)).g;
  float blue  = texture2D(  tex2,  vec2(uv.x + xOffset +0.005,uv.y)).b;
  return vec3(red,green,blue);
}
vec4 tv(vec2 uv, bool left) {
  float jerkOffset = (1.0-step(hash(vec2(iGlobalTime*1.3,5.0)),0.8))*0.005;

  float wiggleOffset = hash(vec2(iGlobalTime*15.0,uv.y*80.0))*0.003;
  float largeWiggleOffset = hash(vec2(iGlobalTime*1.0,uv.y*25.0))*0.004;

  float xOffset = wiggleOffset + largeWiggleOffset + jerkOffset;

  vec3 color;
  if(left) color = tvLeft(uv,xOffset);
	else color = tvRight(uv,xOffset);

  float scanline = -0.2+sin((uv.y+iGlobalTime/100.)*1000.0)*0.1;
  color -= scanline;
  color += vec3 (-0.4, -.2, -.2);
  color *= vec3 (1.5, .6, .6);

  return vec4(color,1.0);
}

//edge highlighting
vec4 getTexLeft(vec2 uv) {
	return texture2D(tex1, uv);
}
vec4 getTexRight(vec2 uv) {
	return texture2D(tex2, uv);
}
float lookup(vec2 p, float dx, float dy, bool left, float d)
{
	vec2 uv = (p.xy + vec2(dx * d, dy * d)) / res;
	vec4 c = left ? getTexLeft(uv) : getTexRight(uv);

	// return as luma
	return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
}
vec4 highlight(vec2 p, bool left) {

	float d = sin(iGlobalTime / 6.0)*1. + 1.5; // kernel offset

	// simple sobel edge detection
	float gx = 0.0;
	gx += -1.0 * lookup(p, -1.0, -1.0, left, d);
	gx += -2.0 * lookup(p, -1.0,  0.0, left, d);
	gx += -1.0 * lookup(p, -1.0,  1.0, left, d);
	gx +=  1.0 * lookup(p,  1.0, -1.0, left, d);
	gx +=  2.0 * lookup(p,  1.0,  0.0, left, d);
	gx +=  1.0 * lookup(p,  1.0,  1.0, left, d);

	float gy = 0.0;
	gy += -1.0 * lookup(p, -1.0, -1.0, left, d);
	gy += -2.0 * lookup(p,  0.0, -1.0, left, d);
	gy += -1.0 * lookup(p,  1.0, -1.0, left, d);
	gy +=  1.0 * lookup(p, -1.0,  1.0, left, d);
	gy +=  2.0 * lookup(p,  0.0,  1.0, left, d);
	gy +=  1.0 * lookup(p,  1.0,  1.0, left, d);

	// hack: use g^2 to conceal noise in the video
	float g = gx*gx + gy*gy;
	//float g2 = g * (sin(iGlobalTime) / 2.0 + 0.5);

	g *= max(0., sin(iGlobalTime / 8.0));

	vec4 col = g * vec4(1.,1.,1.,1.);

	return col;
}


void main() {
	bool left = (gl_FragCoord.x < res.x/2.0);
	vec2 ScreenCenter = left ? LeftScreenCenter : RightScreenCenter;
	vec2 OverlayCenter = left ? LeftOverlayCenter : RightOverlayCenter;
	vec2 otc = gl_FragCoord.xy / res;

	vec4 col;

	//warp that shit
	vec2 tc = HmdWarp(otc, ScreenCenter);

	//todo - better area clamping
	if (!(any(bvec2(clamp(tc,ScreenCenter-vec2(0.25,0.5), ScreenCenter+vec2(0.25,0.5)) - tc)))) {
		vec2 displace = left ? vec2(tc.x+0.25,tc.y) : vec2(tc.x-0.25,tc.y);

		//posprocessing (color) filters
		if(useOverlay) {
			col = tv(displace,left);
			if(useHighlight) col += highlight(displace * res, left);
		}
		else {
			if(left) col = texture2D(tex1,displace);
			else col = texture2D(tex2,displace);
		}

		//add the overlay
		vec2 tco = HmdWarp(otc, OverlayCenter);
		vec2 displaceo = left ? vec2(tco.x+0.25,tco.y) : vec2(tco.x-0.25,tco.y);
		vec4 ol = texture2D(overlay,displaceo);

		gl_FragColor = ol*ol.a + col*(1.-ol.a);

	}
	// black out clamp
	else gl_FragColor = vec4(0.,0.,0.,0.);
}
