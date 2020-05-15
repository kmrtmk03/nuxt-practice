<template lang="pug">
  .container
    .articles_wrapper
      h2 記事一覧

    .thumbnail_wrapper
      a.thumbnail(v-for="post in postList", :key="post.id" :href="post.link")
        img.thumbnail_img(src="http://placehold.jp/300x200.png")
        h3.thumbnail_ttl {{post.title.rendered}}

</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`http://sagatto.com/wp-json/wp/v2/posts`)
    return {
      postList: data
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    padding: 30px 0;
    font-size: 24px;
    text-align: center;
  }
  
  .thumbnail_wrapper {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .thumbnail {
    width: 320px;
    margin-bottom: 50px;
    display: block;
    border-radius: 10px;
    background-color: #eee;
    padding: 20px;

    &_img {
      width: 100%;
      background-color: #333;
    }

    &_ttl {
      font-size: 14px;
      padding: 16px 0 8px;
    }
  }
</style>
