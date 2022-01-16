<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>

    <CLogin v-model="userLogin" v-if="isntRegister" />

    <CRegister v-model="userRegistration" v-if="isRegister" />

    <v-card-actions>
      <CButton v-if="isntRegister" @click="signIn()" title="Entrar" />
      <CButton
        @click="registerControlling()"
        :title="isntRegister ? 'Cadastrar - se' : 'Registrar - se'"
      />
      <CButton v-if="isRegister" @click="changeTabs()" title="Voltar" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { MUser } from "@/models/MUser";

import { Component, Vue } from "vue-property-decorator";

import { MResultRequest } from "@/models/MResultRequest";

import IUserCredential from "@/interface/IUserCredential";

import CButton from "@/components/forms/CButton.vue";
import CLogin from "@/components/loginSystem/CLogin.vue";
import CTextField from "@/components/forms/CTextField.vue";
import CRegister from "@/components/loginSystem/CRegister.vue";

import { VuexCommitNameEnum } from "@/enums/Vuex";
import { FirebaseCollectionEnum } from "@/enums/FirebaseCollection";

@Component({ components: { CTextField, CButton, CLogin, CRegister } })
export default class CLoginSystem extends Vue {
  userLogin = new MUser("", "", "");
  userRegistration = new MUser("", "", "");

  showRegister = false;

  get isRegister(): boolean {
    return this.showRegister;
  }

  get isntRegister(): boolean {
    return this.showRegister == false;
  }

  changeTabs(): void {
    this.userLogin = new MUser("", "", "");
    this.userRegistration = new MUser("", "", "");

    this.showRegister = !this.showRegister;
  }

  async signIn(showMesage = true): Promise<void> {
    const RESULT_REQUEST: MResultRequest<IUserCredential> =
      await this.$firebase.signIn(this.userLogin);

    const INTERFACE_USER_CREDENCIAL: IUserCredential =
      RESULT_REQUEST.data as IUserCredential;

    const API_KEY = INTERFACE_USER_CREDENCIAL.user.apiKey;
    const USER_UID = INTERFACE_USER_CREDENCIAL.user.uid;

    if (API_KEY && USER_UID) {
      this.$store.commit(VuexCommitNameEnum.LOG_IN, INTERFACE_USER_CREDENCIAL);
      if (showMesage) {
        this.$notify.success("Logado com sucesso!");
      }

      this.$router.push("/main");
    } else {
      this.$notify.error("Login não encontrado!");
    }
  }

  async registerControlling(): Promise<void> {
    if (this.showRegister == false) {
      this.showRegister = true;
    } else {
      this.register();
    }
  }

  async register(): Promise<void> {
    let LOADER = this.$loading.show();

    try {
      const RESULT_REQUEST: MResultRequest<IUserCredential> =
        await this.$firebase.createNewAccount(this.userRegistration);

      const RESULT_REQUEST_MESSAGE = RESULT_REQUEST.message;
      const USER_CREDENCIAL: IUserCredential =
        RESULT_REQUEST.data as IUserCredential;

      if (RESULT_REQUEST.error) {
        this.$notify.error(RESULT_REQUEST_MESSAGE);
      } else {
        this.userLogin = new MUser(
          this.userRegistration.name,
          this.userRegistration.email,
          this.userRegistration.password
        );

        this.$firebase.setDoc(
          FirebaseCollectionEnum.USER,
          {
            name: this.userLogin.name,
            email: this.userLogin.email,
          },
          USER_CREDENCIAL.user.uid
        );

        await this.signIn(false);

        this.showRegister = false;
        this.$notify.success(RESULT_REQUEST_MESSAGE);
        this.userRegistration = new MUser("", "", "");
      }
    } finally {
      LOADER.hide();
    }
  }
}
</script>
