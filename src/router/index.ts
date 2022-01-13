import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import MainUser from "@/views/MainUser.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Página principal",
    component: Home,
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
    component: MainUser,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
