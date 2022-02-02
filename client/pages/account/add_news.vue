<template>
    <div v-if="isLoggedIn">
        <v-row class="mt-5" justify="center" align="center">
          <h2>Add new posts</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col :cols="12" md="8">
            <v-form>
              <v-text-field
                v-model="posts.title"
                label="Title"
                class="mb-5"
                required
              ></v-text-field>
                <v-text-field
                v-model="posts.description"
                class="mb-5"
                :counter="160"
                label="Short description"
                required
              ></v-text-field>
              <v-text-field
                v-model="pageLink"
                class="mb-5"
                readonly
                label="page link"
                required
              ></v-text-field>
                <v-textarea
                  filled
                  v-model="posts.post_content"
                  name="input-7-4"
                  label="Page content"
                ></v-textarea>
                <v-btn
                  depressed
                  @click="addNewPost"
                  color="primary"
                  >Add new Posts
                </v-btn>
            </v-form>
          </v-col>
          <v-col cols="12" v-if="response">
            <v-alert
              dense
              outlined
              type="info"
            >{{ response }}
            </v-alert>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import UsersService from "@/api/users";
import blogService from '@/api/blog/blog';
import routeGuard from '@/composable/routeGuard.js';
export default {
  setup() {
    const { routeCheck, isLoggedIn } = routeGuard();
    const routeGuardFetch = async() => {
        await routeCheck(UsersService.adminInfoRoute())
    }
    routeGuardFetch()
    return { isLoggedIn }
  },
  data () {
    return {
      posts: {
        description: '',
        post_content: '',
        title: '',
        active: true,
        page_link: ''
      },
      response: false
    }
  },
  methods: {
    async addNewPost () {
      this.posts.page_link = this.pageLink
      const addNewPost = await blogService.postsSingleBlog(this.posts)
      if (addNewPost.status === 201) {
      this.response = addNewPost.data.status
      } else {
        this.reponse = addNewPost
      }
    }
  },
  computed: {
    pageLink () {
      return this.posts.title.split(' ').join('_')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>