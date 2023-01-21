<template>
    <div>
        <h1 class="blog_heading">News</h1>
        <CustomPopup @onAction="deleteItem" @closeModal="closeChildModal" :modal-data="selectedModalData" v-if="!isEmpty(selectedModalData)" />
        <v-row justify="center" align="center">
          <img src="hwdp.jpg" width="400" height="400" />
          <v-card v-for="(post, key) in posts" :key="key" class="col-md-8 col-12 mb-5">
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
                @click="populateModal(post)"
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
              <NuxtLink :class="{visibility: currentPage === 1 && news.totalCount > news.limit || news.maxPages === 1}" @click="refresh" :to="{ name: 'blog-news', query: { page: routeChangeQuery(-1) }}">Previous page</NuxtLink>
              <NuxtLink :class="{visibility: currentPage === news.maxPages}" @click="refresh" :to="{ name: 'blog-news', query: { page: routeChangeQuery(1) }}">Next page</NuxtLink>
            </div>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import blogService from "../../api/blog/blog";
import { mapState } from "vuex";
import useEvent from "@/composable/events.js";
import CustomPopup from "~/components/CustomPopup.vue";
export default {
  name: "blog-news",
  components: {
    CustomPopup,
    CustomPopup
},
  setup() {
    const { capacity, attending, spacesLeft, increaceCapacity } = useEvent();
    return { capacity, attending, spacesLeft, increaceCapacity };
  },
  data () {
    return {
      selectedModalData: {}
    }
  },
  computed: {
    ...mapState({
      news: (state) => state.news.currentBlog,
      posts: (state) => state.news.blogPosts
    }),
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
  created() {
    this.socket = this.$nuxtSocket({
        channel: "/complain-namespace"
    })
    this.socket.on('msgToClient', (resp) => {
        this.$store.dispatch('news/getBlogFromSocket', resp)
    })
  },
  methods: {
    deleteItem (payload) {
    const newArr = this.posts.filter(object =>  object.id !== payload.id);
      this.$store.dispatch("news/updateBlogPage", newArr)
      this.selectedModalData = {}
    },
    closeChildModal (payload) {
      this.selectedModalData = payload
    },
    isEmpty (obj) {
      for (var x in obj) { return false; }
      return true;
    },
    populateModal (data) {
      this.selectedModalData = data
    },
    routeChangeQuery(queryChange) {
      return Number(this.$route.query.page) + queryChange
    },
    refresh() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ store, route }) {
    const blogs = await blogService.getPage(route.query);
    console.log(blogs)
    store.dispatch("news/getBlogPage", {blogPage: blogs.data, blogPosts: blogs.data.data});
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