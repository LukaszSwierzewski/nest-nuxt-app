import types from "./mutations-types";

export default {
  [types.GET_PAGE_BLOG](state, payload) {
    state.currentBlog = payload;
  },
  [types.ADD_SINGLE_BLOG_FROM_SOCKET](state, payload) {
    state.currentBlog?.data.unshift(payload)
  },
  [types.GET_CURRENT_PAGE_POSTS](state, payload) {
    state.blogPosts = payload
  }
};
