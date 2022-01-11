<template>
  <v-btn plain>{{ title }}</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Button extends Vue {
  @Prop({ required: true })
  title!: string;
}
</script>
