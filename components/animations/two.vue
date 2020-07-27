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
      animation-timing-function: linear;
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

  .loading {
    &-items {
      height: 100%;
      width: 100%;
      position: relative;
    }
    &-item {
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #666;
      border-radius: $_size;
      height: $_size;
      width: $_size;
      position: absolute;
      top: 0;
      left: 0;
      &:nth-child(1) {
        @include anim-load(0s);
      }
      &:nth-child(2) {
        @include anim-load(0.2s);
      }
      &:nth-child(3) {
        @include anim-load(0.4s);
      }
      &:nth-child(4) {
        @include anim-load(0.6s);
      }
      &:nth-child(5) {
        @include anim-load(0.8s);
      }
    }
  }

  @keyframes load {
    0% {
      transform: scale(1);
      border-color: #666;
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(1);
      border-color: #666;
    }
    75% {
      transform: scale(0.1);
      border-color: #ccc;
    }
    100% {
      transform: scale(1);
      border-color: #666;
    }
  }
</style>