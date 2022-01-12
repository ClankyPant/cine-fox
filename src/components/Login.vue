<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField label="Login" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField type="password" label="Senha" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <Button @onClickEvent="login()" title="Entrar" />
      <Button title="Registrar-se" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Button from "@/components/forms/Button.vue";
import TextField from "@/components/forms/TextField.vue";

@Component({ components: { TextField, Button } })
export default class Login extends Vue {
  login(): void {
    this.$notify.warning("Logado com sucesso!");

    return;
  }
}
</script>
