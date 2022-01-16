import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PFirebase from "@/plugins/PFirebase";
import PNotification from "@/plugins/PNotification";
import "vue-loading-overlay/dist/vue-loading.css";
import PLoadingOverlay from "vue-loading-overlay";

Vue.config.productionTip = false;
Vue.use(PNotification, store);
Vue.use(PFirebase);
Vue.use(PLoadingOverlay, {
  color: "#142245",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

document.title = "Cine Fox";
