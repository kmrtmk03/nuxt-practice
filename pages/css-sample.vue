<template lang="pug">
  .container
    h1 CSS Samples
    .style-0
      .mask
        img(src="~/assets/css-sample/img/sample.jpg")

</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 0;
  }
  .mask {
    mask-image: url('~@/assets/css-sample/svg/sample.svg');
    mask-repeat: no-repeat;
    mask-size: 50%;
    mask-position: top 50% left 30%;
  }
</style>