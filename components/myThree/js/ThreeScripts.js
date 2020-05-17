import * as THREE from 'three'
import anime from 'animejs'

export default class ThreeScripts {
  constructor(props) {
    //propsをローカル変数に
    this.props = props

    //Config変数
    this.canvas = this.props.$canvas
    this.windowSize = {
      w: this.props.$width,
      h: this.props.$height
    }

    //Object
    this.scene = null
    this.camera = null
    this.renderer = null
    this.sampleBox = null
    
    //Canvasの初期化
    this.Init()
  }

  Init() {  

    //Renderer
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.windowSize.w, this.windowSize.h)

    //Scene
    this.scene = new THREE.Scene()

    //Camera
    this.camera = new THREE.PerspectiveCamera(45, this.windowSize.w / this.windowSize.h)
    this.camera.position.set(0, 0, 10)

    // console.log(GLTFLoader)

    //SampleObjectを作成
    this.CreateSampleObject()
  }

  //Sample Object
  CreateSampleObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    this.sampleBox = new THREE.Mesh(geometry, material);
    this.scene.add(this.sampleBox);

    this.RenderSampleObject()
  }

  //Sample Object
  RenderSampleObject() {

    requestAnimationFrame(() => {
      this.RenderSampleObject()
    })

    this.sampleBox.rotation.y += 0.01
    this.sampleBox.rotation.x += 0.01
    
    //Renderer
    this.renderer.render(this.scene, this.camera)
  }
}