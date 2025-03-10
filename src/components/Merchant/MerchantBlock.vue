<script setup lang="ts">
import Inventory from '@/components/Inventory/Inventory.vue';
import { onMounted, ref } from 'vue';
import useLocationStore from '@/stores/locationStore.ts';
import InventoryItem from '@/components/Inventory/InventoryItem.vue';
import { allItemsList } from '@/utilites/ItemsList.ts';
const itemSlotCount = 30;
const merchantItems = ref(new Array(itemSlotCount));
const itemsToSell = ref(new Array(itemSlotCount));
const { currentLocation } = useLocationStore();

const clearMerchantItems = () => {
  merchantItems.value = new Array(itemSlotCount);
};

const selectedMerchantItemsAll = () => {
  clearMerchantItems();
  const itemList = [];
  for (let i = 0; i < currentLocation.reputation.length; i++) {
    for (let j = 0; j < currentLocation.reputation[i].merchantItemsIndexes.length; j++) {
      itemList.push(currentLocation.reputation[i].merchantItemsIndexes[j]);
    }
  }
  itemList.map((item, i) => {
    merchantItems.value[i] = allItemsList[item];
  });
};

const selectMerchantItemsByReputation = (repIndex: number) => {
  clearMerchantItems();
  const currentItemList = currentLocation.reputation[repIndex - 1].merchantItemsIndexes;
  currentItemList.map((item, i) => {
    merchantItems.value[i] = allItemsList[item];
  });
};

onMounted(() => {
  selectedMerchantItemsAll();
});
</script>

<template>
  <div class="inventory-block">
    <div class="inventory-block-top-wrapper">
      <div class="merchant-items-block">
        <div class="merchant-items-block-content">
          <div v-for="(item, i) in merchantItems" :key="i" class="item-slot">
            <inventory-item :item="item" />
          </div>
        </div>
        <div class="merchant-items-bottom-block">
          <div class="small-button" @click="selectedMerchantItemsAll">all</div>
          <div class="small-button" @click="selectMerchantItemsByReputation(1)">I</div>
          <div class="small-button" @click="selectMerchantItemsByReputation(2)">II</div>
          <div class="small-button" @click="selectMerchantItemsByReputation(3)">III</div>
        </div>
      </div>
      <div class="merchant-items-block">
        <div class="merchant-items-block-content">
          <div v-for="(item, i) in itemsToSell" :key="i" class="item-slot">
            <inventory-item v-if="item" :item="item" />
          </div>
        </div>
        <div class="merchant-items-bottom-block">
          <div class="small-button sell-junk"></div>
          <div class="medium-button">
            <span>Sell</span>
            <span class="price-icon">10000 </span>
          </div>
        </div>
      </div>
    </div>
    <inventory />
  </div>
</template>

<style scoped>
.price-icon::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('/sprites/currency/obligation.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.small-button {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  cursor: pointer;
  background-size: 48px;
  background-position: center;
  background-repeat: no-repeat;
}

.small-button:hover {
  background-color: white;
  color: black;
}

.small-button.sell-junk {
  background-image: url('/sprites/smallIcons/bin.png');
}

.small-button.sell-junk:hover {
  background-image: url('/sprites/smallIcons/bin-invert.png');
}

.medium-button {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 220px;
  cursor: pointer;
}

.medium-button:hover {
  background-color: white;
  color: black;
}

.merchant-items-block-content {
  border-top: #232323 solid 1px;
  border-left: #232323 solid 1px;
  display: grid;
  grid-template-columns: repeat(5, 64px);
  grid-template-rows: repeat(6, 64px);
  height: fit-content;
}
.merchant-items-bottom-block {
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.item-slot {
  border-bottom: 1px #232323 solid;
  border-right: 1px #232323 solid;
}

.merchant-items-block {
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column;
  width: 320px;
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
  gap: 10px;
  margin-bottom: 25px;
  margin-top: 25px;
}
</style>
