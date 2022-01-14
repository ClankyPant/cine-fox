<template>
  <div>
    <v-snackbar
      transition="scale-transition"
      :key="index"
      :color="notification.color"
      v-model="notification.active"
      v-for="(notification, index) in notifications"
    >
      {{ notification.message }}

      <template v-slot:action="{ attrs }">
        <v-btn @click="notification.active = false" text v-bind="attrs">
          fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { MNotification } from "@/models/notification/MNotification";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CNotification extends Vue {
  get notifications(): Array<MNotification> {
    return this.$notify.notifications();
  }
}
</script>
