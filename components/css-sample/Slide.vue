<template lang="pug">
  .container-wrap
    .container-inner
      span.arrow.arrow-left
      span.arrow.arrow-right
      .slide-wrapper
        ul.slide-parent
          li.slide-child
            p ITEM_A
          li.slide-child
            p ITEM_B
          li.slide-child
            p ITEM_C
          li.slide-child
            p ITEM_D
          li.slide-child
            p ITEM_E
          li.slide-child
            p ITEM_F
          li.slide-child
            p ITEM_G
</template>


<script>
  export default {
    data() {
      return {
        posX: 0
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
  }

  .container-inner {
    overflow-x: scroll;
    height: 100vh;
    position: relative;
  }

  .arrow {
    display: block;
    position: absolute;
    width: 10vw;
    height: 100vw;
    background-color: #333;
    top: 0;
    &-left {
      left: 0;
    }
    &-right {
      right: 0;
    }
  }

  .slide {
    &-wrapper {}
    &-parent {
      display: flex;
      width: 175vw;
    }
    &-child {
      height: 100vh;
      width: 25%;
    }
  }
</style>