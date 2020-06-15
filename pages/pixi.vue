<template lang="pug">
  .wrapper
    #pixiview
</template>

<script>
import anime from 'animejs'
import MySprite from '@/assets/pixi/js/MySprite.js'

let PIXI
if(process.client) {
  PIXI = require('pixi.js')
}

export default {
  data() {
    return {
      width: 0,
      height: 0,
      app: null,
      pixiviewEl: null,
<<<<<<< HEAD
      spritesInstance: [],
      sprites: [],
      spritesPosition: [
        { x: 0.25, y: 0.25 },
        { x: 0.25, y: 0.5 },
        { x: 0.8, y: 0.1 },
        { x: 0.9, y: 0.4 },
        { x: 0.1, y: 0.3 },
        { x: 0.6, y: 0.6 },
        { x: 0.5, y: 0.3 },
        { x: 0.2, y: 0.5 },
      ]
=======
      sprites: [],
      g_blocks: []
>>>>>>> feature/css
    }
  },
  mounted: function() {
    this.Init()

    //Resize
    window.addEventListener('resize', () => {
      //Canvas, Rendererの大きさ
      this.app.renderer.resize(window.innerWidth, window.innerHeight)

      for(let i = 0; i < this.spritesInstance.length; i++) {
        // this.spritesInstance[i].ResizePositionFix(500, 200)
        this.spritesInstance[i].ResizePosition(window.innerWidth, window.innerHeight, this.spritesPosition[i].x, this.spritesPosition[i].y)
      }
    })
  },
  methods: {
    Init() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        backgroundColor: 0xeeeeee,
        antialias: true
      })

      this.app.renderer.autoResize = true
      this.app.stage.interactive = true
      
      this.pixiviewEl = document.getElementById('pixiview')
      this.pixiviewEl.appendChild(this.app.view)

<<<<<<< HEAD
      for(let i = 0; i < this.spritesPosition.length; i++) {
        this.InitSprite(i, 'sample_img-0', this.spritesPosition[i].x, this.spritesPosition[i].y, 0, 0)
      }

      //Test
      this.sprites[0].transform.position.x -= 200
=======
      //Spriteを生成
      // this.InitSprite(0, 'sample_img-0', 0.25, 0.25, -10, -10)
      // this.InitSprite(1, 'sample_img-0', 0.25, 0.5, -10, 0)
      // this.InitSprite(2, 'sample_img-0', 0.25, 0.75, -10, 10)
      // this.InitSprite(3, 'sample_img-0', 0.5, 0.75, 0, 10)
      // this.InitSprite(4, 'sample_img-0', 0.75, 0.75, 10, 10)
      // this.InitSprite(5, 'sample_img-0', 0.75, 0.5, 10, 0)
      // this.InitSprite(6, 'sample_img-0', 0.75, 0.25, 10, -10)
      // this.InitSprite(7, 'sample_img-0', 0.5, 0.25, 0, -10)

      const _w = this.width / 5
      const container_block = new PIXI.Container()
      this.app.stage.addChild(container_block)

      const _blockColor = [ '0xCCCCCC', '0xAAAAAA', '0x111111', '0x333333', '0x666666' ]
      for(let i = 0; i < 5; i++) {
        this.g_blocks[i] = new PIXI.Graphics()
        this.g_blocks[i].beginFill(_blockColor[i]);
        this.g_blocks[i].moveTo(_w * i, 0);
        this.g_blocks[i].lineTo(_w * (i+1), 0);
        this.g_blocks[i].lineTo(_w * (i+1), this.height);
        this.g_blocks[i].lineTo(_w * i, this.height);
        this.g_blocks[i].closePath();
        this.g_blocks[i].endFill();
        container_block.addChild(this.g_blocks[i])
      }
>>>>>>> feature/css
    },

    //Spriteを生成
    InitSprite(_id, _imgName, _posX, _posY, _moveX, _moveY) {
      const img = require('@/assets/pixi/images/' + _imgName + '.png')
      const w = this.app.screen.width
      const h = this.app.screen.height

      this.spritesInstance[_id] = new MySprite(img, w, h, _posX, _posY, _moveX, _moveY) 

      this.sprites[_id] = this.spritesInstance[_id].GetSprite()

      //Spriteを配置
      this.app.stage.addChild(this.sprites[_id]);
    }
  }
}
</script>

<style lang="sass" scoped>

</style>