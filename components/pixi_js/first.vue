<template lang="pug">
  .container
    .close(v-on:click="this.close")
    .pixiview(ref='pixiview')
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
      el: null,
      sprite: null,
      status: {
        animation: false
      }
    }
  },

  mounted: function() {
    this.Init()

    window.addEventListener('resize', () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight)
    })
  },

  methods: {
    close() {
      this.$emit('close')
    },

    Init() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        backgroundColor: 0xeeeeee
      })

      this.app.renderer.autoResize = true
      this.app.stage.interactive = true
      
      this.el = this.$refs.pixiview
      this.el.appendChild(this.app.view)

      this.Display()
    },

    Display() {
      let tex = new PIXI.Texture.from(require('@/assets/pixi_js/images/sample_img-0.png'))
      this.sprite = new PIXI.Sprite(tex)

      this.sprite.anchor.x = 0.5
      this.sprite.anchor.y = 0.5

      this.sprite.x = this.app.screen.width / 2
      this.sprite.y = this.app.screen.height / 2

      this.sprite.interactive = true
      this.sprite.buttonMode = true

      this.sprite.on('pointertap', this.Animation)

      this.app.stage.addChild(this.sprite)
    },

    Animation() {
      if(this.status.animation) {
        return
      }

      this.status.animation = true

      let rotation = {
        value: 0,
        count: 10,
        time: 4000,
        ease: 'easeIn'
      }

      let move_x = {
        value: this.sprite.x,
        time: 1000,
        ease: 'easeInOutQuad'
      }
      
      let timeline = anime.timeline({
        ease: 'liner',
        duration: rotation.time + move_x.time,
        direction: 'alternate',
        loop: 2,
        complete: () => {
          this.status.animation = false
        }
      })

      timeline
        .add({
          targets: rotation,
          value: (360 * rotation.count) * (Math.PI / 180),
          round: 100000,
          duration: rotation.time,
          easing: 'easeInOutQuad',
          update: () => {
            this.sprite.rotation = rotation.value
          }
        })
        .add({
          targets: move_x,
          value: this.sprite.x + 400,
          round: 100000,
          duration: move_x.time,
          easing: move_x.ease,
          update: () => {
            this.sprite.x = move_x.value
          }
        }, '-=1000')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  z-index: 10;
}

.close {
  $_width: 50px;
  $_height: 50px;

  @mixin Giji() {
    display: block;
    content: '';
    position: absolute;
    height: 6px;
    width: $_width;
    background-color: #333;
    top: 22px;
    left: 0;
  }

  @mixin Scale($_scale) {
    transform-origin: 50% 50%;
    transform: scale($_scale);
  }

  height: $_width;
  width: $_height;
  position: fixed;
  top: $_height / 2;
  right: $_width / 2;
  @include Scale(0.7);

  &:hover {
    cursor: pointer;
  }

  &::before {
    @include Giji();
    transform: rotate(45deg);
  }

  &::after {
    @include Giji();
    transform: rotate(-45deg);
  }

}
</style>