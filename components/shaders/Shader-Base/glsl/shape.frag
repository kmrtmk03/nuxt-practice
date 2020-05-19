varying vec2 vUv;
uniform float uAspect;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uAs;
uniform vec2 uMouse;

void main() {
    vec2 p  = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

    float l = 0.1 / length(p);

    gl_FragColor = vec4(vec3(l), 1.0);
}