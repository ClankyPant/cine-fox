<template>
  <v-btn @click="emit()" plain>{{ title }}</v-btn>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CButton extends Vue {
  @Prop({ required: true })
  title!: string;

  @Emit('click')
  emit(): void {
    return;
  }
}
</script>
