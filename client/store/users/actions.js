import types from "./mutations-types";

export default {
  me({ commit }, payload) {
    console.log(payload);
    commit(types.GET_USER_INFO, payload);
  }
};
