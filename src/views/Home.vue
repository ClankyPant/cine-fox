<template>
  <v-img
    max-height="100vh"
    min-height="100vh"
    max-width="100vw"
    src="../assets/login-background.jpg"
  >
    <Login />
  </v-img>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue";

@Component({ components: { Login } })
export default class HomeView extends Vue {}
</script>
