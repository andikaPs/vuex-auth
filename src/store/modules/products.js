import axios from "axios";

export default {
  namespaced: true,
  state: {
    products: null,
    errors: null,
    success: false,
    product: null,
  },
  getters: {
    getProduct(state) {
      return state.product;
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setProduct(state, payload) {
      state.product = payload;
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
    setSuccess(state, data) {
      state.success = data;
    },
  },
  actions: {
    getProducts({ commit }) {
      axios
        .get("api/products")
        .then(res => {
          commit("setProducts", res.data);
        })
        .catch(err => console.log(err));
    },
    getProductById({ commit }, id) {
      // commit("setProduct", null);
      axios
        .get(`api/products/${id}`)
        .then(res => {
          commit("setProduct", res.data);
        })
        .catch(err => console.log(err));
    },

    async addProduct({ commit, dispatch }, data) {
      commit("setErrors", null);

      try {
        const res = await axios.post("api/products", data);
        if (await res) {
          commit("setSuccess", true);
          dispatch("getProducts");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct({ commit, dispatch }, product) {
      commit("setErrors", null);

      const { data, id } = product;

      try {
        const res = await axios.put(`api/products/${id}`, data);
        if (await res) {
          commit("setSuccess", true);
          dispatch("getProducts");
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct({ dispatch }, id) {
      axios
        .delete(`api/products/${id}`)
        .then(res => {
          dispatch("getProducts");
        })
        .catch(err => console.log(err));
    },
  },
};
