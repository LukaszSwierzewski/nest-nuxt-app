import types from "./mutations-types";

export default {
  [types.GET_USER_INFO](state, payload) {
    state.user = payload;
  }
};
