<template>
  <VTextField v-model="value" :type="type || 'text'" :label="label" />
  <span>
    {{ errorMessage }}
  </span>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  label: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>
