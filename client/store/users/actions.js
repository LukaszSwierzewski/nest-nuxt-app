import types from "./mutations-types";

export default {
  me({ commit }, payload) {
    if (payload && payload.status !== 410 && payload.length !== 0) {
      payload.isAuth = true;
      commit(types.GET_USER_INFO, payload);
    }
  },
  logout({ commit }) {
    commit(types.GET_USER_INFO, []);
  }
};
