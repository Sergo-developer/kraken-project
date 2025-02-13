<script setup lang="ts">
import { type Item, quality } from '@/utilites/ItemsList.ts';

const { item } = defineProps<{ item: Item | undefined }>();
</script>

<template>
  <div
    v-if="item"
    :style="{
      borderLeft: `2px ${quality[item.quality]} solid`,
      borderBottom: `2px ${quality[item.quality]} solid`,
    }"
    class="inventory-item"
  >
    <div class="inventory-image" :style="{ backgroundImage: `url(${item.image})` }">
      <div>{{ item.count }}</div>
    </div>
  </div>
</template>

<style scoped>
.inventory-image {
  background-size: 64px;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.inventory-item {
  cursor: pointer;
  height: 100%;
}
</style>
