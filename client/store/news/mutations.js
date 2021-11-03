import types from "./mutations-types";

export default {
  [types.GET_PAGE_BLOG](state, payload) {
    state.currentBlog = payload;
  }
};
