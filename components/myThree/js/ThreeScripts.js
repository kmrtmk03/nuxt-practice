import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import anime from 'animejs'
import { Vector2 } from 'three'

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

    //scroll
    this.scrollAmount = 0
    this.isMoveSide = false

    //mouse
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    this.isModal = false
    
    //Canvasの初期化
    this.Init()
  }

  Init() { 

    //Renderer
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.windowSize.w, this.windowSize.h)
    this.renderer.shadowMap.enabled = true

    //Scene
    this.scene = new THREE.Scene()

    //Camera
    this.camera = new THREE.PerspectiveCamera(60, this.windowSize.w / this.windowSize.h)
    this.camera.position.set(0, 1.5, 10)
    this.camera.lookAt(new THREE.Vector3(0, 1.5, 0))

    // 平行光源
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 10, 5);
    // this.directionalLight.castShadow = true
    this.directionalLight.shadow.mapSize.width = this.directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(this.directionalLight);
    
    let _directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    _directionalLight.position.set(5, 0, 10);
    // _directionalLight.castShadow = true
    this.scene.add(_directionalLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    this.scene.add(ambientLight);

    //GLTFLoader
    this.loader = new GLTFLoader()
    this.loader.load('../base.gltf', data =>  {
      data.scene.traverse( function( node ) {
        if ( node.isMesh ) {
          node.castShadow = true
          node.receiveShadow = true
        }
      });

      this.scene.add( data.scene );
    })

      //SampleObjectを作成
    this.Render()


    const geo_box = new THREE.BoxGeometry(0.8, 0.9, 0.2)
    const mat_box = new THREE.MeshBasicMaterial({color: 0xFF0000})
    const box = new THREE.Mesh(geo_box, mat_box)
    box.name = "trigger-0"
    box.material.visible = false
    box.position.set(0, 1.5, -2.2)
    this.scene.add(box)
        
    this.SetEvent()
  }

  SetEvent() {
    window.addEventListener('mousewheel', e => {
      e.preventDefault()
    }, { passive: false })
    
    window.onmousewheel = (e) => {
      this.MoveCamera(e.wheelDelta)
    }

    this.canvas.addEventListener('mousemove', e => {
      this.MoveMouse(e)
    })

    window.onclick = (e) => {
      // this.OnTrigger()
    }
  }

  MoveMouse(_event) {
    this.mouse.x = (_event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(_event.clientY / window.innerHeight) * 2 + 1
  }

  MoveCamera(_scrollValue) {
    this.scrollAmount += _scrollValue

    if(!this.isMoveSide) {
      let _value = this.scrollAmount * 0.0002
      this.camera.position.set(0, 1.5, -1 * _value + 10)
      if(this.camera.position.z < 0.3) {
        this.camera.position.z = 0.3
        this.scrollAmount = 0
        this.isMoveSide = true
      }
    } else {
      let _value = this.scrollAmount * 0.00002
      this.camera.position.set(Math.sin(_value) * 2.5, 1.5, 0.3)
    }
  }

  OnTrigger () {
    let _bool = false

    if(!this.isModal) {
      this.raycaster.setFromCamera(this.mouse, this.camera)

      const rayObject = this.raycaster.intersectObjects(this.scene.children)
      if(rayObject.length > 0){
        this.ChangeIsModal(true)
        _bool = true
      }
    }

    return _bool
  }

  ChangeIsModal(_bool) {
    this.isModal = _bool
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