<template lang="pug">
  .wrapper
    h1.ttl Check_Modules
</template>

<script>
import anime from 'animejs'

let PIXI
if(process.client) {
    PIXI = require('pixi.js')
}

export default {
  mounted: function() {
    console.log(anime)
    console.log(PIXI)
  }
}
</script>


<style lang="scss" scoped>
  $keyColor: #00c58e;
  .ttl {
    color: $keyColor;
  }
</style>