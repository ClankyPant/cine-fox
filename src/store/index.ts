import NotificationModel from "@/models/notification/NotificationModel";
import StateModel from "@/models/store/StateModel";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new StateModel(),
  mutations: {
    addNotification(state: StateModel, notification: NotificationModel): void {
      state.notifications.push(notification);
    },
  },
  getters: {
    getNotifications(state: StateModel): Array<NotificationModel> {
      return state.notifications;
    },
  },
  actions: {},
  modules: {},
});
