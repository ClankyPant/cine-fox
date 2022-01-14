<template>
  <v-app-bar app v-if="showAppBar" dark color="primary">
    <CButton title="Inicio" />
    <CButton title="Loja" />
    <CButton title="Meus filmes" />

    <v-spacer></v-spacer>

    <CButton title="Conta" />
    <CButton @click="logOff()" title="Sair" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CButton from "@/components/forms/CButton.vue";
import { VuexCommitNameEnum } from "@/enums/Vuex";

@Component({ components: { CButton } })
export default class CAppBar extends Vue {
  get showAppBar(): boolean {
    return this.$store.getters.isLoggedIn;
  }

  logOff(): void {
    this.$store.commit(VuexCommitNameEnum.LOG_OFF);
    this.$router.push("/");
  }
}
</script>
