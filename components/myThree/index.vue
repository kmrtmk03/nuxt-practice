<template lang="pug">
  .wrapper
    canvas(ref="canvas")
</template>

<script>
import ThreeScripts from '@/components/myThree/js/ThreeScripts.js'

export default {
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0
    }
  },

  mounted() {
    //インスタンスを作成
    this.threeScripts = new ThreeScripts({
      $canvas: this.$refs.canvas,
      $width: window.innerWidth,
      $height: window.innerHeight
    })
  }
}
</script>

<style lang="scss">
</style>