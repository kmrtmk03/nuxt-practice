<template lang="pug">
  .container.container-works
    .works-inner
</template>


<script>
export default {
  props: [
    'scrollAmount'
  ],
  data() {
    return {
      isLoaded: false,
      windowWidth: 0
    }
  },
  computed: {
    ValueDeg: function() {
      let value = this.scrollAmount / 5
      return value
    }
  }
  ,
  mounted() {
    this.isLoaded = true
    this.windowWidth = window.innerWidth
  }
}
</script>

<style lang="scss" scoped>
  .container-works {
    position: relative;
    // filter: grayscale(100%);
  }

  .works-inner {
    display: flex;
    width: 95vw;
    height: calc(100vh - 5vw);
    margin: 2.5vw;
    background-color: #333;
  }
</style>