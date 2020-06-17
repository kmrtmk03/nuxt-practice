<template lang="pug">
  .container(ref='container')
    .container-inner
      .content
        ul.content-items(:style="{ transform: 'translateX(' + this.translateX + 'px)'}")
          li.content-item.content-item-0
            Main(:scrollAmount='translateX')
          li.content-item.content-item-1
            h2 content-1
          li.content-item.content-item-2
            h2 content-2
          li.content-item.content-item-3
            h2 content-3
          li.content-item.content-item-4
            h2 content-4
          li.content-item.content-item-5
            h2 content-5
      
      .pagenation
        ul.pagenation-items
          li.pagenation-item(v-for="(item, index) in pageActives" v-bind:key="index" :class="{active: item.isActive}")
</template>


<script>
import Main from '~/components/yoko-scroll/main'

export default {
  data() {
    return {
      translateX: 0,
      stockTranslateX: 0,
      prevalue: 0,
      pageActives: [
        { isActive: true },
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false }
      ]
    }
  },
  components: {
    Main
  },
  mounted() {
    //スクロールを禁止
    this.$refs.container.addEventListener('mousewheel', e => {
      e.preventDefault()
    }, { passive: false })

    window.onmousewheel = (e) => {
      //移動量
      const _value = e.wheelDelta
      
      //慣性をつける処理
      if(this.prevalue != 0) {
        let coefficient = Math.abs(this.prevalue - _value)
        4 < coefficient ? coefficient = 4 : coefficient = coefficient
        this.stockTranslateX += _value * (coefficient * 0.02)
      } else {
        this.stockTranslateX += _value
      }

      //コンテンツをはみ出ないように
      if(0 < this.stockTranslateX) {
        this.stockTranslateX = 0
      } else if(this.stockTranslateX < -1 * window.innerWidth  * 5) {
        this.stockTranslateX = -1 * window.innerWidth * 5
      }

      //スクロール
      this.translateX = this.stockTranslateX

      this.prevalue = _value

      //PageNation
      let pageNum = Math.abs(Math.floor((this.translateX - window.innerWidth * 0.5) / window.innerWidth)) - 1
      pageNum < 0 ? pageNum = 0 : pageNum = pageNum
      for(let i = 0; i < this.pageActives.length; i ++) {
        this.pageActives[i].isActive = false
      }
      this.pageActives[pageNum].isActive = true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .container-inner {
    position: relative;
  }

  .content {
    $width: 100vw;
    overflow: hidden;

    &-items {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
      width: $width * 6;
      height: 100vh;
    }

    &-item {
      height: 100%;
      width: $width;
      &-1 {
        background-color: #fff;
      }
      &-2 {
        background-color: #ccc;
      }
      &-3 {
        background-color: #aaa;
      }
      &-4 {
        background-color: #999;
      }
      &-5 {
        background-color: #666;
      }
    }
  }

  .pagenation {
    $itemWidth: 12px;
    $space: 10px;
    $itemCount: 5;

    width: ($itemWidth * $itemCount) + ($space * ($itemCount - 1));
    height: $itemWidth;
    position: fixed;
    bottom: 1vw;
    left: 50%;
    transform: translateX(-50%);

    &-items {
      display: flex;
      justify-content: space-between;
    }

    &-item {
      width: $itemWidth;
      height: $itemWidth;
      border-radius: $itemWidth;
      box-sizing: border-box;
      border: 1px solid red;

      &.active {
        background-color: red;
      }
    }
  }
</style>