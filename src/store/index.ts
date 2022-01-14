import { LocalStorageItemEnum } from "../enums/LocalStorage";
import { MNotification } from "@/models/notification/MNotification";
import { MState } from "@/models/store/MState";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new MState(),
  mutations: {
    addNotification(state: MState, notification: MNotification): void {
      state.notifications.push(notification);
    },
    logIn(state: MState): void {
      localStorage.setItem(
        LocalStorageItemEnum.API_KEY,
        "8129ndsajdnsua-dksnduias-jfjn"
      );
      state.loginStatus = true;
    },
    logOff(state: MState): void {
      localStorage.removeItem(LocalStorageItemEnum.API_KEY);
      state.loginStatus = false;
    },
  },
  getters: {
    getNotifications(state: MState): Array<MNotification> {
      return state.notifications;
    },
    isLoggedIn(state: MState): boolean {
      const apiKey = localStorage.getItem(LocalStorageItemEnum.API_KEY);

      if (apiKey != null && apiKey.length > 0) {
        state.loginStatus = true;
      }

      return state.loginStatus;
    },
  },
  actions: {},
  modules: {},
});
