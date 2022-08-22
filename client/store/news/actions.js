import types from "./mutations-types";

export default {
  getBlogPage({ commit }, {blogPage, blogPosts}) {
    commit(types.GET_PAGE_BLOG, blogPage);
    commit(types.GET_CURRENT_PAGE_POSTS, blogPosts)
  },
  getBlogFromSocket ({ commit }, payload) {
    commit(types.ADD_SINGLE_BLOG_FROM_SOCKET, payload)
  },
  updateBlogPage({commit}, payload) {
    commit(types.GET_CURRENT_PAGE_POSTS, payload)
  }
};
