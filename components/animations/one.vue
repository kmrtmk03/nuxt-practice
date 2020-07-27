<template lang="pug">
  ul.loading-items
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
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: $_delay;
      animation-iteration-count: infinite;
      animation-direction: normal;
  }

  .loading {
    &-items {
      @include flex-center();
      width: 50px;
    }
    &-item {
      background-color: #aaa;
      border-radius: 10px;
      height: 10px;
      width: 10px;


      &:nth-child(1) { @include anim-load(0s); }
      &:nth-child(2) { @include anim-load(0.33333s); }
      &:nth-child(3) { @include anim-load(0.66666s); }
    }
  }

  @keyframes load {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
</style>