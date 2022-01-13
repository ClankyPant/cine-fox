import NotificationModel from "../notification/NotificationModel";

export default class StateModel {
  notifications: Array<NotificationModel>;
  loginStatus: boolean;
  constructor() {
    this.notifications = [];
    this.loginStatus = false;
  }
}
