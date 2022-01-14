import { VueConstructor } from "vue";
import UserModel from "@/models/UserModel";
import ResultRequest from "@/models/RequestError";
import FireBase from "@/services/FireBase";

declare module "vue/types/vue" {
  interface Vue {
    readonly $firebase: IFirebase;
  }

  interface VueConstructor {
    readonly $firebase: IFirebase;
  }
}

interface IFirebase {
  signIn(userParam: UserModel): Promise<ResultRequest<string>>;
}

const plugin = {
  install: (vue: VueConstructor): void => {
    const vueInstance = vue;

    vueInstance.prototype.$firebase = new FireBase();
  },
};

export default plugin;
