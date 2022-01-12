<template>
  <v-btn @click="emit()" plain>{{ title }}</v-btn>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Button extends Vue {
  @Prop({ required: true })
  title!: string;

  @Emit('onClickEvent')
  emit(): void {
    return;
  }
}
</script>
