<template>
  <div>
    <v-snackbar
      :color="notification.color"
      v-model="notification.active"
      v-for="(notification, index) in notifications"
      :key="index"
    >
      {{ notification.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="notification.active = false"
          text
          v-bind="attrs"
        >
          fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import NotificationModel from "@/models/notification/NotificationModel";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Notification extends Vue {
  showNotification = true;

  get notifications(): Array<NotificationModel> {
    return this.$notify.notifications();
  }
}
</script>
