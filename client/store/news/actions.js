import types from "./mutations-types";

export default {
  getBlogPage({ commit }, payload) {
    commit(types.GET_PAGE_BLOG, payload);
  }
};
