import API from "../axios-setup";

export default {
  getPage(params) {
    return API().get("/blog/news", { params });
  }
};