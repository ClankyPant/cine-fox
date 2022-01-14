import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notify from "@/plugins/notification";
import firebase from "@/plugins/firebase";

Vue.config.productionTip = false;
Vue.use(notify, store);
Vue.use(firebase);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

document.title = 'Cine Fox';