import * as THREE from "three"
import vertexShader from '../glsl/shape.vert'
import fragmentShader from '../glsl/shape.frag'

class Common {
  constructor() {
    //Renderer
    this.scene = null
    this.camera = null
    this.renderer = null

    //Config
    this.size = {
      windowW: null,
      windowH: null
    }
    this.resolution = new THREE.Vector2(0.0, 0.0)

    //Scene Object
    this.light = null
    this.geo = null
    this.mat = null
    this.mesh = null

    //Interaction
    this.mouse = new THREE.Vector2(0.0, 0.0)

    //Out Shader
    this.uniforms = {
      uAspect: {
        value: null
      },
      uTime: {
        value: null
      },
      uMouse: {
        value: this.mouse
      },
      uResolution: {
        value: this.resolution
      }
    }
  }

  Init($canvas) {
    //Canvasのサイズ
    this.SetSize()

    //Scene
    this.scene = new THREE.Scene()

    //Camera
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    //Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })

    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.size.windowW, this.size.windowH);
    this.renderer.setClearColor(0xffffff);
    
    //Light
    this.light = new THREE.PointLight(0x000000)
    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    //Geometry
    this.geo = new THREE.PlaneGeometry(2, 2, 1, 1)
    
    //Shader
    this.uniforms.uAspect.value = this.size.windowW / this.size.windowH

    //Material
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false
    })

    //Mesh
    this.mesh = new THREE.Mesh(this.geo, this.mat)
    this.scene.add(this.mesh)

    this.Render()
  }

  SetSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight
    }

    this.resolution.x = this.size.windowW
    this.resolution.y = this.size.windowH
  }

  Resize(){
    this.setSize();
    this.camera.aspect = this.size.windowW / this.size.windowH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.windowW, this.size.windowH);
  }

  Render(){
    requestAnimationFrame(() => {
      this.Render()            
    })

    //時間経過
    const sec = performance.now() / 1000
    this.uniforms.uTime.value = sec

    //レンダリング
    this.renderer.render(this.scene, this.camera);
  }

  MouseMoved(x, y) {
    this.mouse.x = x / this.size.windowW
    this.mouse.y = 1.0 - (y / this.size.windowH)
  }
}

export default new Common()
