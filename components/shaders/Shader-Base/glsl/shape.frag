varying vec2 vUv;
uniform float uAspect;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uAs;
uniform vec2 uMouse;

void main() {
  vec4 color = vec4(vUv.x, 0.0, 0.0, 1.0);

  gl_FragColor = color;
}