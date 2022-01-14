import { MNotification } from "../notification/MNotification";

export class MState {
  notifications: Array<MNotification>;
  loginStatus: boolean;
  constructor() {
    this.notifications = [];
    this.loginStatus = false;
  }
}
