<template lang="pug">
  .wrapper
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
</style>