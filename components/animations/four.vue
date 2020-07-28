<template lang="pug">
  .wrap
    ul.loading-items
      li.loading-item
      li.loading-item
      li.loading-item
      li.loading-item
      li.loading-item
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
  @mixin anim-load($_delay) {
      animation-name: load;
      animation-duration: 2s;
      animation-timing-function: ease;
      animation-delay: $_delay;
      animation-iteration-count: infinite;
      animation-direction: normal;
  }

  $_size: 50px;
  $_item: 5;

  .wrap {
    @include center-center();
    height: $_size;
    width: $_size;
  }

  .loading {
    &-items {
      height: 100%;
      width: 100%;
      position: relative;
    }
    &-item {
      background-color: #aaa;
      height: $_size / 5;
      width: $_size;
      position: absolute;
      top: 0;
      left: 0;

      transform-origin: top left;
      
      &:nth-child(1) {
        @include anim-load(0s);
        top: ($_size / $_item) * 0;
      }
      &:nth-child(2) {
        @include anim-load(0.4s);
        top: ($_size / $_item) * 1;
      }
      &:nth-child(3) {
        @include anim-load(0.8s);
        top: ($_size / $_item) * 2;
      }
      &:nth-child(4) {
        @include anim-load(1.2s);
        top: ($_size / $_item) * 3;
      }
      &:nth-child(5) {
        @include anim-load(1.6s);
        top: ($_size / $_item) * 4;
      }
    }
  }

  @keyframes load {
    0% {
      transform: scaleX(0);
      transform-origin: top left;
    }
    24% {
      transform-origin: top left;
    }
    25% {
      transform: scaleX(1);
      transform-origin: top right;
    }
    50% {
      transform: scaleX(0);
      transform-origin: top right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: top right;
    }
  }
</style>