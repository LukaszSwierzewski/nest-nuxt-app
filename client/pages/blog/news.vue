<template>
    <div>
        <h1>Page</h1>
        <ul>
            <li v-for="(singleNews, index) in news.data" :key="index">
              <NuxtLink 
                :to="{ name: 'blog-post-page', params: { page: singleNews.page_link }}">
                {{ singleNews.title }}
              </NuxtLink></li>
        </ul>
        <div class="pagination">
            <NuxtLink @click="refresh" :to="{ name: 'blog-news', query: { page: routePageQuery }}">Next page</NuxtLink>
        </div>
        {{ news }}
    </div>
</template>

<script>
import blogService from "../../api/blog/blog";
import { mapState } from "vuex";
export default {
  name: "blog-news",
  computed: {
    ...mapState({
      news: (state) => state.news.currentBlog,
    }),
    routePageQuery() {
      const nextRoute = Number(this.$route.query.page) + 1;
      return nextRoute;
    },
  },
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ store, route }) {
    const blogs = await blogService.getPage(route.query);
    store.dispatch("news/getBlogPage", blogs.data);
  },
  watchQuery: ["page"],
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>