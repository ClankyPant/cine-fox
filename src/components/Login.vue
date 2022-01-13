<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="user" label="Login" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="password" type="password" label="Senha" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <Button @click="login()" title="Entrar" />
      <Button title="Registrar-se" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Button from "@/components/forms/Button.vue";
import TextField from "@/components/forms/TextField.vue";
import { VuexCommitName } from "@/enums/VuexCommitName";

@Component({ components: { TextField, Button } })
export default class Login extends Vue {
  user = "";
  password = "";

  login(): void {
    if (this.user === "luis") {
      this.$store.commit(VuexCommitName.LOG_IN);
      this.$router.push("/main");
      this.$notify.success("Logado com sucesso!");
    } else {
      this.$notify.error("Login não encontrado!");
    }
  }
}
</script>
