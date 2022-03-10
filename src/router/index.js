import { createRouter, createWebHistory } from "vue-router";

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    next();
  } else {
    next("/products");
  }
};

const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: guest,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    beforeEnter: guest,
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue"),
    beforeEnter: auth,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
    beforeEnter: auth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("authToken");
//   if (to.name !== "Login" && !token) next({ name: "Login" });
//   if (to.name === "Login" && token) next({ name: "Posts" });
//   else next();
// });

export default router;
