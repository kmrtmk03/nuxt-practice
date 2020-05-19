<template lang="pug">
  .wrapper(ref="container")
    canvas(ref="canvas")
</template>

<script>
import MyShader from './js/MyShader'

export default {
  mounted() {
    this.myShader = new MyShader({
      $canvas: this.$refs.canvas
    })
  }
}
</script>

<style lang="scss">
  .wrapper {
    width: 100vw;
    height: 100vh;
  }
</style>