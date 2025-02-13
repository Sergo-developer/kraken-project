<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';
import InventoryItem from '@/components/Inventory/InventoryItem.vue';
import router from '@/router';
import type { Item } from '@/utilites/ItemsList.ts';

const inventoryStore = useItemStore();

const showItemInfo = (item: Item) => {
  inventoryStore.selectItem(item);
  router.push('/item');
};
</script>

<template>
  <div class="inventory-block">
    <div class="inventory-block-top-wrapper">
      <div class="character-block-wrapper">
        <div class="character-block">
          <div class="character-equipment-block">
            <div class="inventory-character-item"></div>
            <div class="inventory-character-item"></div>
            <div class="inventory-character-item"></div>
          </div>
          <div class="character-suit-block">
            <div class="inventory-character-item suit"></div>
          </div>
        </div>
        <div class="character-tech-wrapper">
          <div>Tech</div>
          <div class="character-tech-block">
            <div class="inventory-character-item"></div>
            <div class="inventory-character-item"></div>
            <div class="inventory-character-item"></div>
            <div class="inventory-character-item"></div>
          </div>
        </div>
      </div>
      <div class="stats-block"></div>
    </div>
    <div class="inventory-buttons"></div>
    <div class="inventory-wrapper">
      <div v-for="(item, i) in inventoryStore.inventoryItems" :key="i" class="inventory-slot">
        <inventory-item :item @click="showItemInfo(item)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-info {
  background-image: url('public/sprites/background/bgMozaic.png');
  background-size: 150px;
  border: white 1px solid;
  transform: translate(50px, -740px);
  width: 600px;
  height: 650px;
}

.inventory-character-item.suit {
  width: 140px;
  height: 280px;
}

.character-suit-block {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}

.character-equipment-block {
  flex-grow: 1;
  display: flex;
  width: fit-content;
  flex-flow: column;
  justify-content: space-between;
}

.character-block {
  display: flex;
  flex-grow: 1;
  margin: 25px;
}

.character-tech-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  border-top: 1px solid #ffffff;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
}

.character-tech-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.inventory-character-item {
  width: 70px;
  height: 70px;
  border: 1px white solid;
}

.inventory-buttons {
  height: 25px;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  border-top: 1px white solid;
  border-left: 1px white solid;
  border-right: 1px white solid;
}

.character-block-wrapper {
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 65%;
  background-color: rgba(0, 0, 0, 0.25);
}

.stats-block {
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid white;
  width: 35%;
  height: 100%;
}

.inventory-block {
  height: 100%;
  display: flex;
  flex-flow: column;
  margin-left: 25px;
  margin-right: 25px;
}

.inventory-block-top-wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 25px;
  margin-bottom: 25px;
  margin-top: 25px;
}

.inventory-slot {
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
  justify-content: center;
  display: grid;
  height: 260px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(4, 1fr);
}
</style>
