<template>
  <div>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="user.email" label="E-mail" />
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
  </div>
</template>

<script lang="ts">
import UserModel from "@/models/UserModel";

import TextField from "@/components/forms/TextField.vue";

import { Component, VModel, Vue } from "vue-property-decorator";

@Component({ components: { TextField } })
export default class Login extends Vue {
  @VModel()
  user!: UserModel;
}
</script>
