<template>
  <v-img
    max-height="100vh"
    min-height="100vh"
    max-width="100vw"
    src="../assets/login-background.jpg"
  >
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="6" lg="4">
          <Login />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue";

@Component({ components: { Login } })
export default class HomeView extends Vue {}
</script>
