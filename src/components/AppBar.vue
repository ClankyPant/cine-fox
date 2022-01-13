<template>
  <v-app-bar v-if="showAppBar" dark color="primary">
    <Button title="Inicio" class="mx-2" />
    <Button title="Meus filmes" class="mx-2" />

    <v-spacer></v-spacer>

    <Button title="Conta" class="mx-2" />
    <Button @click="logOff()" title="Sair" class="mx-2" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/forms/Button.vue";
import { VuexCommitName } from "@/enums/VuexCommitName";

@Component({ components: { Button } })
export default class AppBar extends Vue {
  get showAppBar(): boolean {
    return this.$store.getters.isLoggedIn;
  }

  logOff(): void {
    this.$store.commit(VuexCommitName.LOG_OFF);
  }
}
</script>
