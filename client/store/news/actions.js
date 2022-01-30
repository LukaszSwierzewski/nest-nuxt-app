import types from "./mutations-types";

export default {
  getBlogPage({ commit }, payload) {
    commit(types.GET_PAGE_BLOG, payload);
  },
  getBlogFromSocket ({ commit }, payload) {
    commit(types.ADD_SINGLE_BLOG_FROM_SOCKET, payload)
  }
};
