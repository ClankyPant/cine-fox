import { LocalStorageItem } from "./../enums/LocalStorageItem";
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
    logIn(state: StateModel): void {
      localStorage.setItem(LocalStorageItem.API_KEY, "8129ndsajdnsua-dksnduias-jfjn");
      state.loginStatus = true;
    },
    logOff(state: StateModel): void {
      localStorage.removeItem(LocalStorageItem.API_KEY);
      state.loginStatus = false;
    },
  },
  getters: {
    getNotifications(state: StateModel): Array<NotificationModel> {
      return state.notifications;
    },
    isLoggedIn(state: StateModel): boolean {
      const apiKey = localStorage.getItem(LocalStorageItem.API_KEY);

      if (apiKey != null && apiKey.length > 0) {
        state.loginStatus = true;
      }

      return state.loginStatus;
    },
  },
  actions: {},
  modules: {},
});
