<template lang="pug">
  .container
    .articles_wrapper
      h2 記事一覧

      .thumbnail_wrapper
        a.thumbnail(v-for="post in postList", :key="post.id" :href="post.link")
          img.thumbnail_img(:src="post._embedded['wp:featuredmedia'][0].source_url")
          h3.thumbnail_ttl {{post.title.rendered}}
          p.thumbnail_date {{post.date | dateFilter}}

    .dammyTrigger(ref="dammyTrigger")
    .dammyNav(:class="{isHidden: this.isHidden}")

</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://pronama.azurewebsites.net/wp-json/wp/v2/posts?_embed&page=1&per_page=16`)
    return {
      postList: data,
      scene: null,
      isHidden: true
    }
  },

  filters: {
    dateFilter(value) {
      return dayjs(value).format('YYYY.MM.DD')
    }
  },

  mounted() {
    this.scene = this.$scrollmagic.scene({
      triggerElement: this.$refs.dammyTrigger,
      triggerHook: 0.5,
      duration: 0
    })
    .on("enter", (event) => {
      this.isHidden = false
    })
    .on("leave", (event) => {
      this.isHidden = true
    })

    this.$scrollmagic.addScene(this.scene)
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
    margin-bottom: 10px;
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
      margin-bottom: 20px;
    }

    &_date {
      font-size: 10px;
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

  .dammyTrigger {
    position: absolute;
    top: 100vh;
    width: 100vw;
  }

  .dammyNav {
    width: 80px;
    height: 80px;
    border-radius: 500px;
    background-color: #aaa;
    position: fixed;
    top: 20px;
    right: 20px;
    display: block;
    &.isHidden {
      display: none;
    }
  }
</style>
