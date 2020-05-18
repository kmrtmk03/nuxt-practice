varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uDepth;
uniform float uAspect;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uAs;
uniform vec2 uMouse;

void main() {

  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  vec2 myUv = (uv - vec2(0.5)) * uAs.xy  + vec2(0.5, 0.45);

  vec4 depth = texture2D(uDepth, myUv);
  float kei = depth.r / 20.0;
  vec4 color = texture2D(uTex, myUv + uMouse * kei);

  gl_FragColor = color;
}