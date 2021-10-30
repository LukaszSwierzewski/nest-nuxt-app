import API from "./axios-setup";

export default {
  getAll() {
    return API().get("/users");
  }
};
