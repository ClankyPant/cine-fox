<template>
  <v-app-bar app v-if="showAppBar" dark color="primary">
    <Button title="Inicio" />
    <Button title="Loja" />
    <Button title="Meus filmes" />

    <v-spacer></v-spacer>

    <Button title="Conta" />
    <Button @click="logOff()" title="Sair" />
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
    this.$router.push("/");
  }
}
</script>
