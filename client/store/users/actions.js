import types from "./mutations-types";

export default {
  add({ commit }, payload) {
    commit(types.GET_ALL_USERS, payload);
  }
};
