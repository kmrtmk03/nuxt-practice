<template lang="pug">
  .container.container-works
    .works-inner
      ul.thumbnail-wrap
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
        li.thumbnail-item
          .thumbnail-image
          h3.thumbnail-title Thumbnail Title
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
    width: 95vw;
    height: calc(100vh - 5vw);
    margin: 2.5vw;
  }

  .thumbnail {
    &-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      text-align: center;
    }

    &-item {
      width: 32%;
      margin-bottom: 20px;
    }
    &-image {
      height: 18vw;
      background-color: #aaa;
      width: 100%;
    }
    &-title {
      padding: 10px 0;
    }
  }
</style>