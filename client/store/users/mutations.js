import types from "./mutations-types";

export default {
  [types.GET_ALL_USERS] (state, payload) {
    state.users = payload
  }
};
