<script setup lang="ts">
import { allItemsList } from '@/utilites/ItemsList.ts';
import InventoryItem from '@/components/Inventory/InventoryItem.vue';
import useItemStore from '@/stores/itemStore.ts';
const { addInventoryItems } = useItemStore();
</script>

<template>
  <div class="inventory-wrapper">
    <div v-for="(item, i) in allItemsList" :key="i" class="inventory-slot">
      <inventory-item :item @click="addInventoryItems(item.name)" />
    </div>
  </div>
</template>

<style scoped>
.inventory-slot {
  width: 65px;
  height: 65px;
  background-color: rgba(0, 0, 0, 0.25);
  border-bottom: 1px white solid;
  border-right: 1px white solid;
}

.inventory-slot:nth-child(10n + 1) {
  border-left: 1px white solid;
}

.inventory-slot:nth-child(-n + 10) {
  border-top: 1px white solid;
}

.inventory-wrapper {
  height: 256px;
  background-image: url('/sprites/background/bgMozaic.png');
  background-size: 150px;
  border: white 1px solid;
  overflow: auto;
  position: absolute;
  top: 32px;
  right: 32px;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
</style>
