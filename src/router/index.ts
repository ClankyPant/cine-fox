import Vue from "vue";
import store from "@/store";
import VueRouter, { RouteConfig } from "vue-router";

import VHomeView from "@/views/VHome.vue";
import VMainUser from "@/views/VMainUser.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Página principal",
    component: VHomeView,
  },
  {
    path: "/about",
    name: "Sobre",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/main",
    name: "",
    component: VMainUser,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/" && store.getters.isLoggedIn == false) {
    next("/");
  }

  if (to.path === "/" && store.getters.isLoggedIn) {
    next("/main");
  }

  next();
});

export default router;
