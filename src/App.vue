<template>
  <v-app>
    <CAppBar />
    <v-main>
      <router-view />
      <Notification />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import CNotification from "@/components/notification/CNotification.vue";
import CAppBar from "@/components/CAppBar.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({ components: { CNotification, CAppBar } })
export default class Login extends Vue {}
</script>
