<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';
import type { Item } from '@/utilites/ItemsList.ts';
import ItemCheatMenu from '@/components/Inventory/ItemCheatMenu.vue';
import Inventory from '@/components/Inventory/Inventory.vue';
import ItemTooltipPopup from '@/components/Inventory/ItemTooltipPopup.vue';

const inventoryStore = useItemStore();

const showItemInfo = (item: Item) => {
  console.log('item is selected', item);
  inventoryStore.selectItem(item);
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
    <inventory @show-item-info="showItemInfo" />
  </div>
  <item-tooltip-popup v-if="inventoryStore.selectedItem"></item-tooltip-popup>
  <item-cheat-menu v-if="true" />
</template>

<style scoped>
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
</style>
