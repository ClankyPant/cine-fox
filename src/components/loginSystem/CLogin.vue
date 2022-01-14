<template>
  <div>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <CTextField v-model="user.email" label="E-mail" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <CTextField v-model="user.password" type="password" label="Senha" />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import {MUser} from "@/models/MUser";

import CTextField from "@/components/forms/CTextField.vue";

import { Component, VModel, Vue } from "vue-property-decorator";

@Component({ components: { CTextField } })
export default class CLogin extends Vue {
  @VModel()
  user!: MUser;
}
</script>
