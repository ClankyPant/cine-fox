<template>
  <v-text-field dense solo :placeholder="label"></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class TextField extends Vue {
  @Prop({ required: true })
  label!: string;
}
</script>
