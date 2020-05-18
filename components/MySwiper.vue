<template lang="pug">
  .wrapper
    h2.ttl Swiper
    .swiper-wrapper(:option="swiperOption")
      .swiper-slide.slide_block
        p スライド1
      .swiper-slide.slide_block
        p スライド2
      .swiper-slide.slide_block
        p スライド3

</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop: true, //無限ループ
        effect: 'fade', //切り替えをフェードに
        pagination: { //ページネーション設定
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: { //前へ・次へのナビ設定
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .ttl {
   font-size: 18px;
   text-align: center;
   padding: 10px 0;
 }
 .slide_block {
   width: 270px;
   background-color: #ccc;
   padding: 150px 0;
 }
</style>