import API from "../axios-setup";

export default {
  getPage(params) {
    return API().get("/blog/news", { params });
  },
  getSingleBlog(routeName) {
    return API().get("/blog/" + routeName);
  },
  postsSingleBlog (params) {
    return API().post('/blog', params)
  },
  postsAddComment (params) {
    return API().post('/comments', params)
  }
};
