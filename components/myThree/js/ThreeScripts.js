import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
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
    this.directionalLight = null
    this.city = null
    
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
    this.camera.position.set(0, 0, 5)

    // 平行光源
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(1, 1, 1);
    // シーンに追加
    this.scene.add(this.directionalLight);
    
    //GLTFLoader
    this.loader = new GLTFLoader()
    this.loader.load('../city-0.gltf', data =>  {
      var gltf = data
      this.city = gltf.scene

      this.city.position.y -= 1

      this.scene.add(this.city)

      //SampleObjectを作成
      this.Render()
    })
  }


  //Sample Object
  Render() {

    requestAnimationFrame(() => {
      this.Render()
    })

    this.city.rotation.y += 0.01

    //Renderer
    this.renderer.render(this.scene, this.camera)
  }
}