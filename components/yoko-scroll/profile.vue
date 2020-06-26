<template lang="pug">
  .container.container-profile(:class='{active: isColor}')
    span.pageNumber 02
    .profile-inner
      .left
        .bg(:style="{ backgroundPosition: 'center left ' + this.ValueDeg + 'px'}")
        .inner
      .right
        h2.title TOMOKI KIMURA
        p.content
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。<br>
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。<br>
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。<br>
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。<br>
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。<br>
          | ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。
</template>


<script>
export default {
  props: [
    'scrollAmount'
  ],
  data() {
    return {
      isColor: false,
      x_colorTarget: 0
    }
  },
  computed: {
    ValueDeg: function() {
      if(this.scrollAmount*-1 > this.x_colorTarget) {
        this.isColor = true
        console.log(this.scrollAmount)
      }
      
      let value = this.scrollAmount / 5
      return value
    }
  },
  mounted() {
    const _half = window.innerWidth / 2
    this.x_colorTarget = _half * 1.5
    console.log(this.x_colorTarget)
  }
}
</script>

<style lang="scss" scoped>
  .pageNumber {
    width: 20vw;
    height: 20vw;
    position: absolute;
    bottom: -5vw;
    z-index: 10;
    color: #000;
    opacity: 0.4;
    line-height: 20vw;
    text-align: left;
    font-size: 15vw;
  }

  .container-profile {
    position: relative;
    filter: grayscale(100%);
    transition: 0.5s;
    &.active {
      filter: grayscale(0%);
      transition: 0.5s;
    }
  }

  .profile-inner {
    display: flex;
    height: calc(100vh - 5vw);
    margin: 2.5vw 0;
  }

  .left,
  .right {
  }

  .left {
    $margin: 2.5vw;
    width: 45vw;
    margin: 0 $margin;
    height: 100%;
    position: relative;

    .bg {
      display: block;
      background-image: url('~@/assets/yoko-scroll/images/bg-profile.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inner {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

  }

  .right {
    height: 100%;
    width: 50vw;
    position: relative;

    .title {
      font-size: 6vw;
      text-align: right;
      color: #333;
      margin-right: 2.5vw;
      margin-top: 8vw;
      position: relative;
      color: #eadda9;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 0.7vw;
        background-color: #eadda9;
        position: absolute;
        bottom: 0vw;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .content {
      width: 67.5vw;
      background-color: #eee;
      padding: 2vw 2vw 4vw;
      position: absolute;
      left: -20vw;
      top: 25vw;
    }
  }


</style>