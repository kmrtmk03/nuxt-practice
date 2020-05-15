<template lang="pug">
  .wrapper
    #pixiview
</template>

<script>

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
    }
  }
}
</script>

<style lang="sass" scoped>

</style>