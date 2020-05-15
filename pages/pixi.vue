<template lang="pug">
  .wrapper
    #pixiview
</template>

<script>
import anime from 'animejs'

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
      img: null,
      texture: null,
      sprite: null
    }
  },
  mounted: function() {
    this.Init()
  },
  methods: {
    Init() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        backgroundColor: 0xeeeeee
      })
      
      this.pixiviewEl = document.getElementById('pixiview')
      this.pixiviewEl.appendChild(this.app.view)

      this.InitSprite()
    },

    InitSprite() {
      //Texture読み込み
      this.img = require("@/assets/images/sample_img-0.png")
      this.texture = new PIXI.Texture.from(this.img)
      this.sprite = new PIXI.Sprite(this.texture);

      //Spriteのアンカーポイントを選択
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;

      //Spriteの位置を決める
      this.SetPosition(this.sprite, this.app.screen.width / 2, this.app.screen.height / 2)

      //Spriteの大きさ
      this.SetScale(this.sprite, 0.2, 0.2)

      //インタラクションの設定
      this.sprite.interactive = true
      this.sprite.buttonMode = true
      this.sprite.on('pointertap', this.OnClickSprite)

      //Spriteを配置
      this.app.stage.addChild(this.sprite);
    },

    //Spriteの大きさを変更
    SetScale(_sprite, _x, _y) {
      _sprite.scale.x = _x
      _sprite.scale.y = _y
    },

    //Spriteの位置を変更
    SetPosition(_sprite, _x, _y) {
      _sprite.x = _x
      _sprite.y = _y
    },

    //Click下ときの処理
    OnClickSprite() {
      console.log("HELLO WORLD")
      // this.ChangeScale(this.sprite)
      this.ChangePosition(this.sprite, 0, 10)
    },

    //Spriteを動かす処理
    ChangeScale(_target) {
      let val = {
        scaleX: _target.scale.x * 1000
      }
      anime({
        targets: val,
        scaleX: 1000,
        round: 1,
        easing: 'linear',
        update: () => {
          this.SetScale(_target, val.scaleX / 1000, val.scaleX / 1000)
        },
        complete: () => {
          val.scaleX = 0.2 * 1000
          this.SetScale(_target, val.scaleX / 1000, val.scaleX / 1000)
        }
      })
    },

    ChangePosition(_target, _parsentX, _parsentY) {
      let appSize = {
        w: this.app.screen.width,
        h: this.app.screen.height
      }

      let pos = {
        x: _target.x,
        y: _target.y
      }

      let amount = {
        x: appSize.w * (_parsentX / 100),
        y: appSize.h * (_parsentY / 100)
      }

      // let amount = appSize.h * (_parsentY / 100)

      anime({
        targets: pos,
        x: pos.x + amount.x,
        y: pos.y + amount.y,
        round: 1,
        easing: 'easeInOutQuad',
        update: () => {
          this.SetPosition(this.sprite, pos.x, pos.y)
        }
      })
    }

  }
}
</script>

<style lang="sass" scoped>

</style>