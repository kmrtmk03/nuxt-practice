<template lang="pug">
  .wrapper
    canvas(ref="canvas")
    .modal(v-if="isModal")
      .modal-inner
        h2.modal-title Modal Title
        .modal-button(v-on:click="OnCloseModal") CLOSE
</template>

<script>
import ThreeScripts from '@/components/myThree/js/ThreeScripts.js'

export default {
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      isModal: false
    }
  },

  mounted() {
    //インスタンスを作成
    this.threeScripts = new ThreeScripts({
      $canvas: this.$refs.canvas,
      $width: window.innerWidth,
      $height: window.innerHeight
    })

    this.$refs.canvas.onclick = (e) => {
      this.OnTriggerModal()
    }
  },

  methods: {
    OnTriggerModal() {
      if(!this.isModal) {
        this.isModal = this.threeScripts.OnTrigger()
      }
    },

    OnCloseModal() {
      this.isModal = false
      this.threeScripts.ChangeIsModal(false)
    }
  }
}
</script>

<style lang="scss">
  .modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);

    &-inner {
      width: 95vw;
      height: calc(100vh - 5vw);
      background-color: #fff;
      margin: 2.5vw;
      position: relative;
    }

    &-title {
      text-align: center;
      padding: 30px 0;
      font-size: 80px;
      color: #333;
    }

    &-button {
      width: 300px;
      height: 60px;
      background-color: #333;
      border-radius: 5px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      line-height: 60px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>