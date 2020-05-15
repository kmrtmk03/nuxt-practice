<template lang="pug">
  .wrapper
    h1.ttl Nuxt-Practice
</template>

<script>
import anime from 'animejs'

export default {
  mounted: function() {
    console.log(anime)
  }
}
</script>


<style lang="scss" scoped>
  $keyColor: #00c58e;
  .ttl {
    color: $keyColor;
  }
</style>