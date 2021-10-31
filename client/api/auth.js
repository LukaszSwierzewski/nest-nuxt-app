import API from "./axios-setup";

export default {
  login(userParams) {
    const user = {
      username: "lukasz",
      password: "12345t"
    };
    return API().post("/users/login", user);
  }
};
