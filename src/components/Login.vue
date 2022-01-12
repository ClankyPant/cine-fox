<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>
    <v-card-text>
      <TextField label="Login" />
    </v-card-text>
    <v-card-text>
      <TextField type="password" label="Senha" />
    </v-card-text>
    <v-card-actions>
      <Button title="Entrar" />
      <Button title="Registrar-se" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextField from "@/components/forms/TextField.vue";
import Button from "@/components/forms/Button.vue";

@Component({ components: { TextField, Button } })
export default class Login extends Vue {}
</script>
