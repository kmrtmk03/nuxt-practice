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


    this.scrollAmount = 0
    this.cityPosition = [
      {x: 0, z: 0},

      {x: 2.5, z: 0},
      {x: -2.5, z: 0},

      {x: 5, z: 0},
      {x: -5, z: 0},

      {x: 7.5, z: 0},
      {x: -7.5, z: 0},

      {x: 10, z: 0},
      {x: -10, z: 0},
    ]
  }

  Init() { 

    //Renderer
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.windowSize.w, this.windowSize.h)
    this.renderer.shadowMap.enabled = true

    //Scene
    this.scene = new THREE.Scene()

    //Camera
    this.camera = new THREE.PerspectiveCamera(45, this.windowSize.w / this.windowSize.h)
    this.camera.position.set(0, 2, 3)
    this.camera.lookAt(new THREE.Vector3(0, 0.5, 0))

    // 平行光源
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 10, 5);
    this.directionalLight.castShadow = true
    this.scene.add(this.directionalLight);    
    
    //GLTFLoader
    this.loader = new GLTFLoader()
    this.loader.load('../city-0.gltf', data =>  {
      var gltf = data
      this.city = gltf.scene
      // this.city.position.y -= 1
      this.scene.add(this.city)

      //SampleObjectを作成
      this.Render()
    })

    for(let i = 0; i < 9; i++) {
      //GLTFLoader
      this.loader = new GLTFLoader()
      this.loader.load('../city-0.gltf', data =>  {
        var gltf = data
        this.city = gltf.scene
        this.city.position.x -= this.cityPosition[i].x
        this.city.position.z -= this.cityPosition[i].z
        this.city.castShadow = true
        this.city.receiveShadow = true
        this.scene.add(this.city)
      })
    }
        
    this.SetEvent()
  }

  SetEvent() {
    window.addEventListener('mousewheel', e => {
      e.preventDefault()
    }, { passive: false })
    
    window.onmousewheel = (e) => {
      this.MoveCamera(e.wheelDelta)
    }
  }

  MoveCamera(_scrollValue) {
    this.scrollAmount += _scrollValue
    let _value = this.scrollAmount * 0.00002
    this.camera.position.set(Math.sin(_value) * 10, 2, 3)
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  //Sample Object
  Render() {
    requestAnimationFrame(() => {
      this.Render()
    })

    //Renderer
    this.renderer.render(this.scene, this.camera)
  }
}