import Vue from "vue";
import Vuex from "vuex";

import IUserCredential from "@/interface/IUserCredential";

import { LocalStorageItemEnum } from "../enums/LocalStorage";

import { MState } from "@/models/store/MState";
import { MNotification } from "@/models/notification/MNotification";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new MState(),
  mutations: {
    addNotification(state: MState, notification: MNotification): void {
      state.notifications.push(notification);
    },
    logIn(state: MState, userCredencial: IUserCredential): void {
      localStorage.setItem(
        LocalStorageItemEnum.API_KEY,
        userCredencial.user.apiKey
      );

      localStorage.setItem(
        LocalStorageItemEnum.USER_UID,
        userCredencial.user.uid
      );

      state.loginStatus = true;
    },
    logOff(state: MState): void {
      localStorage.removeItem(LocalStorageItemEnum.API_KEY);
      localStorage.removeItem(LocalStorageItemEnum.USER_UID);
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
