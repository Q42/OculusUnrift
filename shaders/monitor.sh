

float hash(in vec2 v) { return fract(sin(v[1])*43758.5453123); }

void main(void)
{

  vec2 uv =  gl_FragCoord.xy/iResolution.xy;
  
  float jerkOffset = (1.0-step(hash(vec2(iGlobalTime*1.3,5.0)),0.8))*0.05;
  
  float wiggleOffset = hash(vec2(iGlobalTime*15.0,uv.y*80.0))*0.003;
  float largeWiggleOffset = hash(vec2(iGlobalTime*1.0,uv.y*25.0))*0.004;
  
  float xOffset = wiggleOffset + largeWiggleOffset + jerkOffset;
  
  float red   =   texture2D(  iChannel0,  vec2(uv.x + xOffset -0.01,uv.y)).r;
  float green =   texture2D(  iChannel0,  vec2(uv.x + xOffset,    uv.y)).g;
  float blue  = texture2D(  iChannel0,  vec2(uv.x + xOffset +0.01,uv.y)).b;
  
  vec3 color = vec3(red,green,blue);
  float scanline = -0.2+sin(uv.y*800.0)*0.25;
  color -= scanline;
  color += vec3 (-0.3, 0., 0.);
  color *= vec3 (2.6, 0.1, 0.1);
  
  gl_FragColor = vec4(color,1.0);
}
