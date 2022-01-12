import NotificationModel from "../notification/NotificationModel";

export default class StateModel {
  notifications: Array<NotificationModel>;

  constructor() {
    this.notifications = [];
  }
}
