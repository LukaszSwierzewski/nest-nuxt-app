import types from "./mutations-types";

export default {
  getBlogPage({ commit }, payload) {
    commit(types.GET_PAGE_BLOG, payload);
    commit(types.GET_CURRENT_PAGE_POSTS, payload.data)
  },
  getBlogFromSocket ({ commit }, payload) {
    commit(types.ADD_SINGLE_BLOG_FROM_SOCKET, payload)
  },
  updateBlogPage({commit}, payload) {
    commit(types.GET_CURRENT_PAGE_POSTS, payload)
  }
};
