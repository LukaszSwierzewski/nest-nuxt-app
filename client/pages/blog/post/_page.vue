<template>
    <div class="mt-5">
      <v-row class="flex flex-column" justify="center" align="center">
        <v-col class="col-12 col-md-8">
          <h1> {{ blogData.title }} </h1>
          <p>{{ blogData.description }}</p>
          <p>{{ blogData.post_content }}</p>
        </v-col>
      </v-row>
      <v-row class="flex-column" justify="center" align="center" >
        <v-col v-if="blogData.comments && blogData.comments.length > 0" class="col-md-8 col-12">
        <Comment v-for="(comment, index) in blogData.comments" :key='index' :comment="comment" />
        </v-col>
        <v-col class="col-md-8 col-12">
          {{ user }}
          <v-form v-if="loggedIn">
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
              >Add new Comment
            </v-btn>
          </v-form>
            <v-alert
              v-else
              dense
              outlined
              type="info"
            >Only logged user can add comments. Login to add</v-alert>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import blogService from "../../../api/blog/blog";
import Comment from '../../../components/blog/Comment'
import { mapState } from "vuex";
export default {
  name: "single-blog-news",
  components: {
    Comment
  },
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
      loggedIn: (state) => state.auth.loggedIn,
      user: (state) => state.auth.user
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