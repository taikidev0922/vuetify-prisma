<template>
  <div>
    <h1>User Management</h1>
    <form @submit.prevent="createUser">
      <VRow>
        <VCol>
          <TextInput name="name" label="名前" />
        </VCol>
        <VCol>
          <TextInput name="email" type="email" label="メールアドレス" />
        </VCol>
        <VCol>
          <ComboBox
            :items="departments"
            itemText="name"
            name="departmentId"
            label="部署"
          />
        </VCol>
        <VCol>
          <VBtn type="submit" color="primary">Add User</VBtn>
        </VCol>
      </VRow>
    </form>
    <VDataTable :items="users" :headers="headers">
      <template v-slot:item.edit="{ item }">
        <VBtn type="submit" color="success">Edit</VBtn>
      </template>
      <template v-slot:item.delete="{ item }">
        <VBtn type="submit" color="error">Delete</VBtn>
      </template>
    </VDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { User } from "@/server/api/users";
import type { Department } from "@/server/api/departments";
import { useForm } from "vee-validate";
import * as yup from "yup";

const headers = [
  { title: "名前", value: "name" },
  { title: "メールアドレス", value: "email" },
  { title: "部署", value: "department.name" },
  { value: "edit", width: 10 },
  { value: "delete", width: 10 },
];

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  departmentId: yup.number().required(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const users = ref<User[]>([]);
const departments = ref<Department[]>([]);

onMounted(async () => {
  users.value = await $fetch<User[]>("/api/users");
  departments.value = await $fetch<Department[]>("/api/departments");
});

const createUser = handleSubmit(async (values, { resetForm }) => {
  try {
    const createdUser = await $fetch<User>("/api/users", {
      method: "POST",
      body: values,
    });

    // 新しいユーザーをリストに追加
    users.value.push(createdUser);

    // フォームをリセット
    resetForm();
  } catch (error) {
    console.error("Error creating user:", error);
    // エラーハンドリングをここに追加（例：エラーメッセージの表示）
  }
});
</script>
