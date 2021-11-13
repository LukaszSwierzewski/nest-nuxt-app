<template>
    <div>
        <h1> {{ blogData.title }} </h1>
        <p>{{ blogData.description }}</p>
        <div>
          <p v-for='comment in blogData.comments' :key='comment.id'>{{ comment }}</p>
        </div>
    </div>
</template>

<script>
import blogService from "../../../api/blog/blog";
import { mapState } from "vuex";
export default {
  name: "single-blog-news",
  data() {
    return {
      blabla: "blabla",
    };
  },
  created() {
    console.log(this.$route.params.page);
  },
  async asyncData({ params }) {
    let blogData = await blogService.getSingleBlog(params.page);
    blogData = blogData.data;
    return { blogData };
  },
};
</script>

<style lang="scss" scoped>
</style>