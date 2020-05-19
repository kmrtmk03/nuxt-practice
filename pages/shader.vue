<template lang="pug">
  .container
    ShaderBase
</template>

<script>
import ShaderBase from '~/components/shaders/Shader-Base/index.vue'
import ShaderFake3d from '~/components/shaders/Shader-Fake3d/index.vue'

export default {
  components: {
    ShaderFake3d,
    ShaderBase
  }
}
</script>

<style lang="scss">
</style>