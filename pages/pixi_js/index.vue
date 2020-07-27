<template lang="pug">
  .wrapper
    First(v-if="this.display.first" v-on:close="modal_close")
    ul.button
      li.button-item(v-on:click="this.modal_open") First
      li.button-item Second
</template>

<script>
import anime from 'animejs'
import First from '~/components/pixi_js/first'

export default {
  data() {
    return {
      display: {
        first: false
      }
    }
  },
  components: {
    First
  },
  methods: {
    modal_open() {
      this.display.first = true
    },

    modal_close() {
      this.display.first = false
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}

.button {
  width: 420px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 100vh;

  &-item {
    font-weight: bold;
    width: 200px;
    text-align: center;
    padding: 20px 0;
    border-radius: 5px;
    color: #333;
    background-color: #ddd;
    transition: 0.15s;

    &:hover {
      color: #ddd;
      background-color: #333;
      transition: 0.3s;
      cursor: pointer;
      transform: scale(1.1);
      box-shadow: 0px 0px 2px 2px rgba(0,0,0, 0.15);
    }
  }
}
</style>