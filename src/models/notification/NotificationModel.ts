import { NotificationType } from "@/enums/NotificationType";

export default class NotificationModel {
  message: string;
  active: boolean;
  type: NotificationType;

  constructor(message: string, notificationType = NotificationType.NOTHING) {
    this.message = message;
    this.active = true;
    this.type = notificationType;
  }

  get color(): string {
    return this.type;
  }
}
