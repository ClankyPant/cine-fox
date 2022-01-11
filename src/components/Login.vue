<template>
  <v-card dark color="primary" class="container">
    <div class="d-flex justify-center my-5">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </div>

    <v-card-text>
      <v-row justify="center">
        <v-col lg="6" sm="12">
          <TextField label="Login" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col lg="6" sm="12">
          <TextField label="Senha" />
        </v-col>
      </v-row>
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

<style scoped>
@media all and (max-width: 600px) {
  .container {
    width: 75vw;
    margin: 25vh auto 0 auto;
  }
}

@media all and (min-width: 601px) {
  .container {
    width: 45vw;
    margin: 25vh auto 0 auto;
  }
}
</style>
