<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
      <Notification />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Notification from "@/components/notification/Notification.vue";
import AppBar from "@/components/AppBar.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({ components: { Notification, AppBar } })
export default class Login extends Vue {}
</script>
