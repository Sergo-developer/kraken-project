<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const preventContextMenu = (event: MouseEvent) => {
  event.preventDefault();
};

onMounted(() => {
  document.addEventListener('contextmenu', preventContextMenu);
});

onUnmounted(() => {
  document.removeEventListener('contextmenu', preventContextMenu);
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
