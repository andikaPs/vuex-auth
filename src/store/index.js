import { createStore } from "vuex";
import auth from "./modules/auth";
import products from "./modules/products";

export const store = createStore({
  modules: {
    auth,
    products,
  },
});
