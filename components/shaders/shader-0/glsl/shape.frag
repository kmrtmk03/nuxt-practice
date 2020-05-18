varying vec2 vUv;
uniform sampler2D uTex;
uniform float uAspect;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uAs;

void main() {

  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  vec2 myUv = (uv - vec2(0.5)) * uAs.xy  + vec2(0.5);

  vec4 depth = texture2D(uTex,myUv);

  gl_FragColor = depth;
}