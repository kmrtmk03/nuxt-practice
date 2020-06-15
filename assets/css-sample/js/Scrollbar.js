export default class Scrollbar {
  
  constructor(_wrap, _container) {
    //import PIXI
    this.PIXI
    if(process.client) {
      this.PIXI = require('pixi.js')
    }

    // Props to local variable
    this.wrap = _wrap
    this.container = _container
    
    // canvas size
    this.size = {
      w: 0, //width
      h: 0, //height
      padding: 0, //Lineの上下の余白
      lineLength: 0 //Lineの長さ
    }

    // scroll amount
    this.amount = 0
    // page height
    this.pageHeight = 0
    // amount/pageHeight
    this.parsent = 0

    // PIXI App
    this.app = null
    this.view = null

    // object
    this.line = null
    this.circle = null

    // statement
    this.isDown = false;

    // init
    this.OnInit()
  }

  //初期化
  OnInit() {
    //Canvas size
    this.size.w = window.innerWidth * 0.05
    this.size.h = 300
    this.size.padding = 50
    this.size.length = this.size.h - (this.size.padding * 2)

    this.amount = window.pageYOffset
    this.pageHeight = this.container.offsetHeight

    //PIXI init
    this.app = new this.PIXI.Application({
      width: this.size.w,
      height: this.size.h,
      backgroundColor: 0x333333
    })
    this.view = this.wrap
    this.view.appendChild(this.app.view)

    //Create Object
    this.CreateLine()
    this.CreateCircle()
    
    //Scroll Event
    this.OnScroll()
    window.addEventListener('scroll', () => {
      if(!this.isDown) {
        this.amount = window.pageYOffset
        this.circle.y = this.size.length * (this.amount / (this.pageHeight - window.innerHeight)) + this.size.padding
      }
    })

    window.addEventListener('resize', () => {
      if(!this.isDown) {
        this.amount = window.pageYOffset
        this.circle.y = this.size.length * (this.amount / (this.pageHeight - window.innerHeight)) + this.size.padding
      }
    })
  }

  //Scroll Event
  OnScroll() {
    //スライダーを動かしているときは発火しない
    if(!this.isDown) {
      this.amount = window.pageYOffset
      this.circle.y = this.size.length * (this.amount / (this.pageHeight - window.innerHeight)) + this.size.padding
    }
  }

  //Create Line
  CreateLine() {
    //Create
    this.line = new this.PIXI.Graphics()
    this.line.lineStyle(2, 0xffffff).moveTo(this.size.w / 2, this.size.padding).lineTo(this.size.w / 2, this.size.h - this.size.padding)
    this.app.stage.addChild(this.line)
  }

  //Create Circle
  CreateCircle() {
    //Create
    this.circle = new this.PIXI.Graphics()
    this.circle.lineStyle(0)
    this.circle.beginFill(0xffffff, 1)
    this.circle.drawCircle(this.size.w / 2, 0, 10)
    this.circle.endFill()

    //Interactive
    this.circle.interactive = true
    this.circle.buttonMode = true

    //Set MouseEvent
    this.circle
      .on('mousedown', () => {
        this.isDown = true
      })
      .on('mouseup', () => {
        this.isDown = false
      })
      .on('mousemove', () => {
        if(this.isDown) {
          let _y = this.app.renderer.plugins.interaction.mouse.global.y
          
          if(_y < this.size.padding) { _y = this.size.padding }
          else if (this.size.h - this.size.padding < _y) { _y = this.size.h - this.size.padding }

          this.circle.y = _y
          this.parsent = (_y - this.size.padding) / this.size.length

          scrollTo(0, (this.pageHeight - window.innerHeight) * this.parsent)
        }
      }
    )

    //どこでMouseUpをしてもいいように
    window.addEventListener('mouseup', () => {
      this.isDown = false
    })

    //Add
    this.app.stage.addChild(this.circle)
  }
}