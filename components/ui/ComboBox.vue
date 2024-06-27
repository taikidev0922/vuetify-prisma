<template>
  <VCombobox
    v-model="value"
    :items="items"
    item-title="name"
    item-value="id"
    :return-object="false"
    :label="label"
  />
  <span>
    {{ errorMessage }}
  </span>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import type { PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  itemText: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const { value, errorMessage } = useField(() => props.name);
</script>
