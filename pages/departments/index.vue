<template>
  <div>
    <h1>部署一覧</h1>
    <form @submit.prevent="createDepartment">
      <TextInput name="name" />
      <button type="submit">新規作成</button>
    </form>
    <ul>
      <li v-for="department in departments" :key="department.id">
        {{ department.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Department } from "@prisma/client";
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const departments = ref<Department[]>([]);

onMounted(async () => {
  departments.value = await $fetch<Department[]>("/api/departments");
});

const createDepartment = handleSubmit(async (values, { resetForm }) => {
  try {
    const createdDepartment = await $fetch<Department>("/api/departments", {
      method: "POST",
      body: values,
    });
    departments.value.push(createdDepartment);
    resetForm();
  } catch (error) {
    console.error("Error creating department:", error);
  }
});
</script>
