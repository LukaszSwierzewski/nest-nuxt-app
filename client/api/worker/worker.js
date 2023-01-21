import API from "../axios-setup";

export default {
  postOrder(params) {
    return API().post("/worker-productivity", params);
  }
};
