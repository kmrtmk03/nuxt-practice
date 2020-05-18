<template lang="pug">
  .container
    .articles_wrapper
      h2 記事一覧

    .thumbnail_wrapper
      a.thumbnail(v-for="post in postList", :key="post.id" :href="post.link")
        img.thumbnail_img(:src="post._embedded['wp:featuredmedia'][0].source_url")
        h3.thumbnail_ttl {{post.title.rendered}}
        p.thumbnail_txt
          span(v-html="post.excerpt.rendered")

</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://pronama.azurewebsites.net/wp-json/wp/v2/posts?_embed&page=1&per_page=6`)
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
    margin-bottom: 30px;
    display: block;
    border-radius: 10px;
    padding: 20px;
    transition: 0.2s;
    border: 2px solid #eee;
    text-decoration: none;

    &:hover {
      box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
      transition: 0.4s;
    }

    &_img {
      width: 100%;
      background-color: #333;
    }

    &_ttl {
      font-size: 14px;
      padding: 16px 0 8px;
    }

    &_txt {
      font-size: 12px;
    }
  }

  .button {
    width: 100px;
    padding: 10px 0;
    text-align: center;
    color: #fff;
    background-color: #333;
    margin: 0 auto;
  }
</style>
