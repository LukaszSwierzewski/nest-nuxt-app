import API from "./axios-setup";

export default {
  register(userParams) {
    return API().post("/users", userParams);
  },
  sessionAfterLogin(userParams) {
    return API().post("/users/set/session", userParams);
  },
  login(userParams) {
    return API().post("/users/login", userParams);
  },
  logout() {
    return API().post("/users/logout");
  },
  setupSession(ID) {
    return API().post("/users/check/session", ID);
  },
  checkSessionExpire() {
    return API().get("/users/check/me");
  }
};
