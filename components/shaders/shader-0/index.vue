<template lang="pug">
  .wrapper(ref="container")
    canvas(ref="canvas")
</template>

<script>
import MyShader from './js/MyShader'

export default {
  mounted() {
    this.myShader = new MyShader({
      $canvas: this.$refs.canvas,
      $container: this.$refs.container
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