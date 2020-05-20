<template lang="pug">
  .container
    .style-0
      .mask(:class="{visible: isMaskVisible}")
        img(src="~/assets/css-sample/img/sample.jpg" :style="{ transform: 'translateY(' + this.imgTranslateY + 'px)'}")
    .style-1
</template>


<script>
export default {
  data() {
    return {
      isMaskVisible: false,
      imgTranslateY: 0
    }
  },
  mounted() {
    this.OnMask()

    window.addEventListener('scroll', this.OnScroll)

  },
  methods: {
    OnMask() {
      this.isMaskVisible = true
    },

    OnScroll() {
      console.log(window.pageYOffset)
      this.imgTranslateY = window.pageYOffset * 0.3
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
  }

  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 0;
  }
  .style-0 {
    overflow: hidden;
    height: 100vh;
  }
  .mask {
    mask-image: url('~@/assets/css-sample/svg/sample.svg');
    mask-repeat: no-repeat;
    mask-size: 50%;
    mask-position: top 50% left -100%;

    &.visible {
      mask-position: top 50% left 50%;
      transition: 2s;
    }

    & > img {
      display: block;
      width: 100%;
    }
  }

  .style-1 {
    background-color: #ccc;
    height: 100vh;
  }
</style>