import API from "./axios-setup";

export default {
  login(userParams) {
    const user = {
      username: "test",
      password: "12345"
    };
    return API().post("/users/login", user);
  },
  setupSession(ID) {
    return API().post("/users/check/session", ID);
  },
  checkSessionExpire() {
    return API().get("/users/check/me");
  }
};
