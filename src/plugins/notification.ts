import { NotificationType } from "@/enums/NotificationType";
import { VuexCommitName } from "@/enums/VuexCommitName";
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
        commitStore(text, store);
      },
      success: (text: string): void => {
        commitStore(text, store);
      },
      error: (text: string) => {
        commitStore(text, store);
      },
      warning: (text: string) => {
        commitStore(text, store);
      },
      notifications: (): Array<NotificationModel> =>
        store.getters.getNotifications,
    };
  },
};

function commitStore(text: string, store: Store<unknown>): void {
  store.commit(
    VuexCommitName.ADD_NOTIFICATION,
    new NotificationModel(text, NotificationType.WARNING)
  );
}

export default plugin;
