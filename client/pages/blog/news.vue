<template>
    <div>
        <h1 class="blog_heading">News</h1>
        <v-row justify="center" align="center">
          <v-card v-for="(post, key) in news.data" :key="key" class="col-md-8 col-12 mb-5">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>{{ post.title }}</v-card-title>
            </v-img>
        
            <v-card-subtitle class="pb-0">
              {{ post.created_at | dateString }}
            </v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ post.description }}</div>
            </v-card-text>
        
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                Share
              </v-btn>
        
              <v-btn
                color="primary"
                text
              >
              <NuxtLink :to="{ name: 'blog-post-page', params: { page: post.page_link }}">Read more</NuxtLink>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-col class="col-md-8 col-12 pa-0 mt-4 mb-4">
            <div class="pagination">
              <NuxtLink :class="{visibility: currentPage === 1 && news.totalCount > news.limit}" @click="refresh" :to="{ name: 'blog-news', query: { page: routePrevPageQuery }}">Previous page</NuxtLink>
              <NuxtLink :class="{visibility: currentPage === news.maxPages}" @click="refresh" :to="{ name: 'blog-news', query: { page: routeNextPageQuery }}">Next page</NuxtLink>
            </div>
          </v-col>
        </v-row>
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
    routeNextPageQuery() {
      const nextRoute = Number(this.$route.query.page) + 1;
      return nextRoute;
    },
    routePrevPageQuery() {
      const nextRoute = Number(this.$route.query.page) - 1;
      return nextRoute;
    },
    currentPage() {
      return Number(this.$route.query.page)
    }
  },
  filters: {
    dateString: function (date) {
      const dateString = new Date(date)
      return dateString.toLocaleDateString('pl-PL')
    }
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
.blog_heading {
  margin: 2rem auto;
  text-align: center;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visibility {
  visibility: hidden;
}
</style>