<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="user.email" label="e-mail" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="user.password" type="password" label="Senha" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <Button @click="login()" title="Entrar" />
      <Button @click="register()" title="Registrar - se" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Button from "@/components/forms/Button.vue";
import TextField from "@/components/forms/TextField.vue";
import { VuexCommitName } from "@/enums/VuexCommitName";
import UserModel from "@/models/UserModel";

import FireBaseService from "@/services/FireBase";
import ResultRequest from "@/models/RequestError";

@Component({ components: { TextField, Button } })
export default class Login extends Vue {
  user: UserModel = new UserModel("", "");

  async login(): Promise<void> {
    const fireBaseService = new FireBaseService();
    fireBaseService.signIn(this.user);

    if (this.user.email === "luis") {
      this.$store.commit(VuexCommitName.LOG_IN);
      this.$notify.success("Logado com sucesso!");

      this.$router.push("/main");
    } else {
      this.$notify.error("Login não encontrado!");
    }
  }

  async register(): Promise<void> {
    const fireBaseService = new FireBaseService();
    const resultRequest: ResultRequest<void> =
      await fireBaseService.createNewAccount(this.user);

    const message = resultRequest.message;
    if (resultRequest.error) {
      this.$notify.error(message);
    } else {
      this.$notify.success(message);
    }
  }
}
</script>
