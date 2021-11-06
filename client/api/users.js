import API from "./axios-setup";

export default {
  getAll() {
    return API().get("/users");
  },
  userInfoRoute() {
    return API().get("/users/protected/account");
  },
  adminInfoRoute() {
    return API().get("/users/protected/admin");
  }
};
