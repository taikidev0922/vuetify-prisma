<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>My files</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list :items="items"></v-list>
  </v-navigation-drawer>

  <v-main style="height: 500px">
    <slot />
  </v-main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const drawer = ref(false);
const group = ref(null);
const items = ref([
  {
    title: "Foo",
    value: "foo",
  },
]);

watch(group, () => {
  drawer.value = false;
});
</script>
