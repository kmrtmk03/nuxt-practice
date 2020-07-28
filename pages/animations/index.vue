<template lang="pug">
  .container(ref="container")
    ul.content
      li.outer
        h2 1
        .inner
          One
      li.outer
        h2 2
        .inner
          Two
      li.outer
        h2 3
        .inner
          Three
      li.outer
        h2 4
        .inner
          Four
      li.outer
        h2 5
        .inner
      li.outer
        h2 6
        .inner
      li.outer
        h2 7
        .inner
      li.outer
        h2 8
        .inner
      li.outer
        h2 9
        .inner
</template>


<script>
  import One from '~/components/animations/one'
  import Two from '~/components/animations/two'
  import Three from '~/components/animations/three'
  import Four from '~/components/animations/four'

  export default {
    data() {
      return { }
    },
    components: {
      One,
      Two,
      Three,
      Four
    },
    mounted() { },
    methods: { }
  }
</script>

<style lang="scss" scoped>
  .container {
  }

  h1 {
    font-size: 14px;
    text-align: center;
    padding: 40px 0;
  }

  .content {
    @include flex-center();
    padding: 40px 0;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 940px;
  }

  .outer {
    margin: 0 0 20px;
    border-radius: 10px;
    transition: 0.1s;
    &:hover {
      box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.15);
      cursor: pointer;
      transform: scale(1.05);
      transition: 0.2s;
    }
  }

  h2 {
    border-radius: 10px 10px 0px 0px;
    text-align: center;
    font-size: 32px;
    color: #aaa;
    background-color: #ccc;
    width: 300px;
    margin: 0 auto;
    padding: 20px 0 10px;
  }

  .inner {
    border: 10px solid #ccc;
    border-radius: 0px 0px 10px 10px;
    background-color: #fff;
    box-sizing: border-box;
    margin: 0px auto 0;
    height: 300px;
    width: 300px;
    @include center-center();
  }
</style>