<template lang="pug">
  .container.container-main
    span.bg(:style="{ transform: 'skewY(' + this.ValueDeg + 'deg)'}" :class="{loaded: this.isLoaded}")
    .main-wrap
      h2.title MAIN VISUAL
</template>


<script>
export default {
  props: [
    'scrollAmount'
  ],
  data() {
    return {
      isLoaded: false,
      windowWidth: 0
    }
  },
  computed: {
    ValueDeg: function() {
      let value = (this.scrollAmount / this.windowWidth) * -3
      return value
    }
  },
  mounted() {
    this.isLoaded = true
    this.windowWidth = window.innerWidth
  }
}
</script>

<style lang="scss" scoped>
  .container-main {
    position: relative;
  }

  .bg {
    background-color: #ccc;
    width: calc(100vw - 5vw);
    display: block;
    position: absolute;
    left: 2.5vw;
    z-index: 0;
    height: calc(100vh - 5vw);
    transform: scaleY(0);
    // &.loaded {
    //   animation-name: bgHeight;
    //   animation-duration: 1s;
    //   animation-timing-function: ease;
    //   animation-fill-mode: forwards;
    // }
  }

  @keyframes bgHeight {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .main-wrap {
    width: calc(100vw - 5vw);
    height: calc(100vh - 5vw);
    margin: 2.5vw auto;
    position: relative;
    z-index: 1;
  }

  .title {
    font-family: Helvetica, sans-serif;
    font-size: 13vw;
    color: #fff;
    text-align: center;
    line-height: calc(100vh - 4vw);
  }
</style>