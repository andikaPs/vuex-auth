import axios from "axios";

export default {
  namespaced: true,
  state: {
    userData: null,
    errors: null,
    isLogin: false,
  },
  getters: {
    user(state) {
      return state.userData;
    },
  },
  mutations: {
    setUserdata(state, payload) {
      state.userData = payload;
    },
    setErrors(state, error) {
      state.errors = error;
    },
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    async register({ commit }, data) {
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("api/register", data);
        commit("setUserdata", response.data.user);
        commit("setErrors", null);
      } catch (error) {
        return false;
      }
    },
    async login({ commit }, data) {
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("api/login", data);
        if (response) {
          commit("setUserdata", response.data.user);
          commit("setErrors", null);
          localStorage.setItem("authToken", response.data.token);
          commit("setIsLogin", true);
        }
      } catch (err) {
        Swal.fire({
          title: "Failed!",
          text: "Login Failed! please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      // axios
      //   .post("api/login", data)
      //   .then(response => {
      //     console.log(response);
      //     // commit("setUserdata", response.data.user);
      //     // commit("setErrors", null);
      //     // localStorage.setItem("authToken", response.data.token);
      //     // commit("setIsLogin", true);
      //   })
      //   .catch(err => console.log(err));
    },
    logout({ commit }) {
      axios
        .post("api/logout")
        .then(response => {
          localStorage.removeItem("authToken");
          commit("setUserdata", null);
          commit("setIsLogin", false);
        })
        .catch(err => console.log(err));
    },
  },
};
