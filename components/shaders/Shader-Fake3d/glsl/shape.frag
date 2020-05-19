varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uDepth;
uniform float uAspect;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uAs;
uniform vec2 uMouse;


vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {

  vec2 uv = uPixelRatio * gl_FragCoord.xy / uResolution.xy;

  vec2 myUv = (uv - vec2(0.5)) * uAs.xy  + vec2(0.5);

  vec4 tex1 = texture2D(uDepth,mirrored(myUv));
  vec2 fake3d = vec2(myUv.x + (tex1.r - 0.5)*uMouse.x/35.0, myUv.y + (tex1.r - 0.5)*uMouse.y/15.0);

  vec4 color = texture2D(uTex, fake3d);

  gl_FragColor = color;
}