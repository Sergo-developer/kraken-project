<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';

const { selectedItem } = useItemStore();
</script>

<template>
  <div>
    {{ selectedItem.name }}
  </div>
</template>

<style scoped></style>
