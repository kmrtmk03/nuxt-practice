<template lang="pug">
  .wrap
    .item
      .item-inner
</template>


<script>
  import anime from 'animejs'

  export default {
    data() {
      return { }
    },
    components: {
    },
    mounted() { },
    methods: { }
  }
</script>

<style lang="scss" scoped>
  @mixin anim($_delay) {
      animation-name: rotate;
      animation-duration: 3s;
      animation-timing-function: ease;
      animation-delay: $_delay;
      animation-iteration-count: infinite;
      animation-direction: normal;
  }

  $_size: 50px;

  .wrap {
    @include center-center();
    height: $_size;
    width: $_size;
  }

  .item {
    @mixin giji() {
      content: '';
      display: block;
      position: absolute;
    }

    background-color: #aaa;
    border-radius: $_size;
    height: $_size;
    width: $_size;
    position: relative;
    z-index: 1;
    overflow: hidden;

    &::before {
      @include giji();
      background-color: #ccc;
      width: $_size;
      height: $_size;
      top: 0;
      left: $_size / 2;
      transform-origin: left $_size / 2;
      @include anim(0s);

    }

    &-inner {
      $_border: 20px;
      background-color: #fff;
      border-radius: $_size;
      height: $_size - $_border;
      width: $_size - $_border;
      position: absolute;
      top: $_border / 2;
      left: $_border / 2;
      z-index: 10;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
</style>