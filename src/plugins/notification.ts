import { NotificationTypeEnum } from "@/enums/Notification";
import { VuexCommitNameEnum } from "@/enums/Vuex";
import NotificationModel from "@/models/notification/NotificationModel";
import { VueConstructor } from "vue";
import { Store } from "vuex";

declare module "vue/types/vue" {
  interface Vue {
    readonly $notify: INotification;
  }

  interface VueConstructor {
    readonly $notify: INotification;
  }
}

interface INotification {
  info(text: string): void;
  success(text: string): void;
  error(text: string): void;
  warning(text: string): void;
  notifications(): Array<NotificationModel>;
}

const plugin = {
  install: (vue: VueConstructor, store: Store<unknown>): void => {
    const vueInstance = vue;

    vueInstance.prototype.$notify = {
      info: (text: string): void => {
        commitStore(text, store, NotificationTypeEnum.NOTHING);
      },
      success: (text: string): void => {
        commitStore(text, store, NotificationTypeEnum.SUCCESS);
      },
      error: (text: string) => {
        commitStore(text, store, NotificationTypeEnum.ERROR);
      },
      warning: (text: string) => {
        commitStore(text, store, NotificationTypeEnum.WARNING);
      },
      notifications: (): Array<NotificationModel> =>
        store.getters.getNotifications,
    };
  },
};

function commitStore(text: string, store: Store<unknown>, notificationType: NotificationTypeEnum): void {
  store.commit(
    VuexCommitNameEnum.ADD_NOTIFICATION,
    new NotificationModel(text, notificationType)
  );
}

export default plugin;
