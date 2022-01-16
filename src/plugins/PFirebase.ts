import { VueConstructor } from "vue";

import { SFirebase } from "@/services/SFirebase";

import { MUser } from "@/models/MUser";
import { MResultRequest } from "@/models/MResultRequest";

import IUserCredential from "@/interface/IUserCredential";

declare module "vue/types/vue" {
  interface Vue {
    readonly $firebase: IFirebase;
  }

  interface VueConstructor {
    readonly $firebase: IFirebase;
  }
}

interface IFirebase {
  signIn(userParam: MUser): Promise<MResultRequest<IUserCredential>>;
  createNewAccount(user: MUser): Promise<MResultRequest<IUserCredential>>;
  setDoc<T>(
    collectionParam: string,
    docParam: T,
    docIdParam: string
  ): Promise<MResultRequest<T>>;
}

const plugin = {
  install: (vue: VueConstructor): void => {
    const vueInstance = vue;

    vueInstance.prototype.$firebase = new SFirebase();
  },
};

export default plugin;
