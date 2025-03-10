<script setup lang="ts">
import Inventory from '@/components/Inventory/Inventory.vue';
import { ref } from 'vue';
import useLocationStore from '@/stores/locationStore.ts';
const merchantItems = ref(new Array(30).fill([]));
const itemsToSell = ref(new Array(30).fill([]));
const { currentLocation } = useLocationStore();
</script>

<template>
  <div class="inventory-block">
    <div class="inventory-block-top-wrapper">
      <div class="merchant-items-block">
        <div class="merchant-items-block-content">
          <div v-for="(item, i) in merchantItems" :key="i" class="item-slot"></div>
        </div>
        <div class="merchant-items-bottom-block">
          <div class="small-button">all</div>
          <div class="small-button">I</div>
          <div class="small-button">II</div>
          <div class="small-button">III</div>
        </div>
      </div>
      <div class="merchant-items-block">
        <div class="merchant-items-block-content">
          <div v-for="(item, i) in itemsToSell" :key="i" class="item-slot"></div>
        </div>
        <div class="merchant-items-bottom-block">
          <div class="small-button sell-junk"></div>
          <div class="medium-button">Sell</div>
        </div>
      </div>
    </div>
    <inventory />
  </div>
</template>

<style scoped>
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
