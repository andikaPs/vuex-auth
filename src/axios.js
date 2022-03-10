import axios from "axios";
import { store } from "./store";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;
// axios.defaults.headers.common["Accept"] = "application/json";
// axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status == 422) {
      if (error.response.data.errors.email) {
        store.commit("auth/setErrors", error.response.data.errors);
      } else {
        store.commit("products/setErrors", error.response.data.errors);
      }
    } else if (error.response.status == 401) {
      store.commit("auth/setErrors", error.response.data.message);
      throw Error(error.response.data.message);
    }
  }
);

axios.interceptors.request.use(function (config) {
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return config;
});
