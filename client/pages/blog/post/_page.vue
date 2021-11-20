<template>
    <div class="mt-5">
      <v-row class="flex flex-column">
        {{ blogData }}
        {{ user }}
        <h1> {{ blogData.title }} </h1>
        <p>{{ blogData.description }}</p>
        <p>{{ blogData.post_content }}</p>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-form v-if="user && user.id">
            <v-textarea
              filled
              v-model="addCommentData.comment_content"
              name="input-7-4"
              label="Comment content"
          ></v-textarea>
            <v-btn
              depressed
              @click="addComment"
              color="primary"
              >Add new Posts
            </v-btn>
          </v-form>
            <v-alert
              v-else
              dense
              outlined
              type="info"
            >Only logged user can add comments</v-alert>
        </v-col>
      </v-row>
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
      addCommentData: {
        comment_content: '',
        user_id: null,
        news_id: null
      },
      status: null
    };
  },
  methods: {
    async addComment () {
      this.addCommentData.user_id = this.user.id
      this.addCommentData.news_id = this.blogData.id
      const comment = await blogService.postsAddComment(this.addCommentData)
      if (comment.status === 201) {
        this.status = 'Comments has been added'
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
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