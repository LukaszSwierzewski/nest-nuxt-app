import API from "./axios-setup";

export default {
  getAll() {
    return API().get("/users");
  },
  getUserInfo() {
    return API().get("/users/protected/route");
  }
};
