import { NotificationTypeEnum } from "@/enums/Notification";

export default class NotificationModel {
  message: string;
  active: boolean;
  type: NotificationTypeEnum;

  constructor(message: string, notificationType = NotificationTypeEnum.NOTHING) {
    this.message = message;
    this.active = true;
    this.type = notificationType;
  }

  get color(): string {
    return this.type;
  }
}
