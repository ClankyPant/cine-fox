<template>
  <v-text-field
    solo
    dense
    :type="type"
    v-model="valueModel"
    :placeholder="label"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component({})
export default class TextField extends Vue {
  @VModel()
  valueModel!: string;

  @Prop({ required: true })
  label!: string;

  @Prop()
  type!: string;
}
</script>
