<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';
import InventoryItem from '@/components/Inventory/InventoryItem.vue';
const inventoryStore = useItemStore();
</script>
<template>
  <div class="inventory-buttons"></div>
  <div class="inventory-wrapper">
    <div v-for="(item, i) in inventoryStore.inventoryItems" :key="i" class="inventory-slot">
      <inventory-item :item @click="$emit('showItemInfo', item)" />
    </div>
  </div>
</template>
<style scoped>
.inventory-buttons {
  height: 25px;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  border-top: 1px #232323 solid;
  border-left: 1px #232323 solid;
  border-right: 1px #232323 solid;
}

.inventory-slot {
  background-color: rgba(0, 0, 0, 0.25);
  border-bottom: 1px #232323 solid;
  border-right: 1px #232323 solid;
}

.inventory-slot:nth-child(10n + 1) {
  border-left: 1px #232323 solid;
}

.inventory-slot:nth-child(-n + 10) {
  border-top: 1px #232323 solid;
}

.inventory-wrapper {
  justify-content: center;
  display: grid;
  height: 260px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(4, 1fr);
}
</style>
