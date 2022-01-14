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
      <CButton v-if="isRegister" @click="showRegister = false" title="Voltar" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import UserModel from "@/models/UserModel";
import ResultRequest from "@/models/RequestError";

import FireBaseService from "@/services/FireBase";

import { Component, Vue } from "vue-property-decorator";

import { VuexCommitNameEnum } from "@/enums/Vuex";

import CButton from "@/components/forms/CButton.vue";
import CTextField from "@/components/forms/CTextField.vue";
import CLogin from "@/components/loginSystem/CLogin.vue";
import CRegister from "@/components/loginSystem/CRegister.vue";

@Component({ components: { CTextField, CButton, CLogin, CRegister } })
export default class CLoginSystem extends Vue {
  userLogin: UserModel = new UserModel("", "", "");
  userRegistration: UserModel = new UserModel("", "", "");

  showRegister = false;

  get isRegister(): boolean {
    return this.showRegister;
  }

  get isntRegister(): boolean {
    return this.showRegister == false;
  }

  changeTabs(): void {
    this.showRegister = !this.showRegister;
  }

  async signIn(): Promise<void> {
    const result: ResultRequest<string> = await this.$firebase.signIn(
      this.userLogin
    );

    const token = result.data;
    if (token) {
      this.$store.commit(VuexCommitNameEnum.LOG_IN);
      this.$notify.success("Logado com sucesso!");

      this.$router.push("/main");
    } else {
      this.$notify.error("Login não encontrado!");
    }
  }

  async registerControlling(): Promise<void> {
    if (this.showRegister == false) {
      this.showRegister = true;
    } else {
      const fireBaseService = new FireBaseService();
      const resultRequest: ResultRequest<void> =
        await fireBaseService.createNewAccount(this.userRegistration);

      const message = resultRequest.message;
      if (resultRequest.error) {
        this.$notify.error(message);
      } else {
        this.$notify.success(message);
      }
    }
  }
}
</script>
