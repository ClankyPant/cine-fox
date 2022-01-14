<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>

    <Login v-model="userLogin" v-if="isntRegister" />

    <Register v-model="userRegistration" v-if="isRegister" />

    <v-card-actions>
      <Button v-if="isntRegister" @click="signIn()" title="Entrar" />
      <Button
        @click="registerControlling()"
        :title="isntRegister ? 'Cadastrar - se' : 'Registrar - se'"
      />
      <Button v-if="isRegister" @click="showRegister = false" title="Voltar" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import UserModel from "@/models/UserModel";
import ResultRequest from "@/models/RequestError";

import FireBaseService from "@/services/FireBase";

import { Component, Vue } from "vue-property-decorator";

import { VuexCommitName } from "@/enums/VuexCommitName";

import Button from "@/components/forms/Button.vue";
import TextField from "@/components/forms/TextField.vue";
import Login from "@/components/loginSystem/Login.vue";
import Register from "@/components/loginSystem/Register.vue";

@Component({ components: { TextField, Button, Login, Register } })
export default class LoginSystem extends Vue {
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
      this.$store.commit(VuexCommitName.LOG_IN);
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
