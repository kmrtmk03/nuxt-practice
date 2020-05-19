import * as THREE from "three"

import vertexShader from '../glsl/shape.vert'
import fragmentShader from '../glsl/shape.frag'
import { Vector2 } from "three"

class Common {
    constructor() {
      this.scene = null
      this.camera = null
      this.renderer = null

      this.size = {
          windowW: null,
          windowH: null
      }

      this.light = null

      this.geo = null
      this.mat = null

      this.mouse = new Vector2(0.0, 0.0)
      this.resolution = new Vector2(0.0, 0.0)
      this.as = new Vector2(0.0, 0.0)

      this.uniforms = {
        uResolution: {
          value: this.resolution
        },
        uAspect: {
            value: null
        },
        uTex: {
          type: 't',
          value: null
        },
        uDepth: {
          type: 't',
          value: null
        },
        uPixelRatio: {
          value: null
        },
        uAs: {
          value: this.as
        },
        uMouse: {
          value: this.mouse
        }
      }

      this.mesh = null
    }

    Init($canvas, $container) {
      this.canvas = $canvas
      this.container = $container
    
      this.ResizeHandler()

      //Canvas Config
      this.scene = new THREE.Scene()
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
      this.renderer = new THREE.WebGLRenderer({
          canvas: $canvas
      })
      this.renderer.setPixelRatio(this.ratio)
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0xffffff);
      this.light = new THREE.PointLight(0x000000)
      this.light.position.set(2, 2, 2)
      this.scene.add(this.light)
      this.geo = new THREE.PlaneGeometry(2, 2, 1, 1)
        
      this.mat = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          wireframe: false
      })

      this.mesh = new THREE.Mesh(this.geo, this.mat)
      this.scene.add(this.mesh)

      this.Render()
    }

    ResizeHandler() {

      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.width = this.container.offsetWidth
      this.height = this.container.offsetHeight
      this.ratio = window.devicePixelRatio

      this.canvas.width = this.width
      this.canvas.height = this.height
      this.canvas.style.width = this.width +'px'
      this.canvas.style.height = this.height + 'px'
      this.imageAspect = 3 / 4

      let a1,a2;
      if(this.height / this.width < this.imageAspect) {
        a1 = 1;
        a2 = (this.height / this.width) / this.imageAspect;
      } else{
        a1 = (this.width / this.height) * this.imageAspect ;
        a2 = 1;
      }

      this.as.x = a1
      this.as.y = a2

      //Shaderに渡す値
      this.uniforms.uAspect.value = this.size.windowW / this.size.windowH
      this.resolution.x = this.width
      this.resolution.y = this.height

      let _ratio = 1 / this.ratio
      this.uniforms.uPixelRatio.value = _ratio
    }

    Render(){
      requestAnimationFrame(() => {
          this.Render()            
      })

      //レンダリング
      this.renderer.render(this.scene, this.camera);
    }

    MouseMoved(x, y) {

      let _width = this.windowWidth / 2
      let _height = this.windowHeight / 2

      this.mouse.x = (_width - x)/_width;
      this.mouse.y = (_height - y)/_height;
    }
}

export default new Common()
