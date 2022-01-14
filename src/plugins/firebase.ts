import { VueConstructor } from "vue";
import { MUser } from "@/models/MUser";
import { MResultRequest } from "@/models/MResultRequest";
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
  signIn(userParam: MUser): Promise<MResultRequest<string>>;
}

const plugin = {
  install: (vue: VueConstructor): void => {
    const vueInstance = vue;

    vueInstance.prototype.$firebase = new FireBase();
  },
};

export default plugin;
