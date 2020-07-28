<template lang="pug">
  .container
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
      el: null
    }
  },

  mounted: function() {
    this.Init()

    window.addEventListener('resize', () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight)
    })
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

      this.app.renderer.autoResize = true
      this.app.stage.interactive = true
      
      this.el = this.$refs.pixiview
      this.el.appendChild(this.app.view)

      this.Display()
    },

    Display() {

      const _color = [
        0xffaaaa,
        0xaaffaa,
        0xaaaaff,
        0xfafaaa
      ]

      const _size = 20

      const _x = Math.ceil(this.width / _size)
      const _y = Math.ceil(this.height / _size)

      for(let i = 0; i < _x; i++) {
        for(let j = 0; j < _y; j++) {
          const graphics = new PIXI.Graphics()
          const c = Math.floor(Math.random() * _color.length)

          graphics.beginFill(_color[c])
          graphics.drawRect(i * _size, j * _size, _size, _size)
          graphics.endFill()
          this.app.stage.addChild(graphics)
        }
      }
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