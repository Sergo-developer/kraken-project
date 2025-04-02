<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';
import { qualityColor } from '@/utilites/ItemsList.ts';
import ItemTooltipAdditionalInfo from '@/components/Inventory/itemTooltipAdditionalInfo.vue';
const { unselectItem, selectedItem } = useItemStore();
</script>

<template>
  <div class="popup-shade">
    <div v-if="selectedItem !== null" class="tooltip-body">
      <div class="close-button-wrapper"><div @click="unselectItem">x</div></div>
      <div class="item-info-wrapper">
        <div class="top-wrapper">
          <div :style="{ backgroundImage: `url(${selectedItem?.image})` }" class="item-image"></div>
          <div class="item-name-wrapper">
            <span
              class="item-name"
              :style="{
                fontSize: selectedItem.name.length <= 10 ? '28px' : '21px',
                color: qualityColor[selectedItem.quality],
              }"
            >
              {{ selectedItem.name }}
            </span>
            <span
              class="item-sub-name"
              :style="{
                color: qualityColor[selectedItem.quality],
              }"
            >
              {{ selectedItem.quality }}
            </span>
            <span class="item-sub-name">{{ selectedItem.attribute.type }}</span>
            <span class="item-sub-name price">{{ selectedItem.price }}</span>
          </div>
        </div>
        <div class="description-wrapper">
          {{ selectedItem.description }}
        </div>
        <item-tooltip-additional-info></item-tooltip-additional-info>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('/sprites/currency/obligation.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.item-name-wrapper {
  text-align: center;
  width: 300px;
  display: flex;
  gap: 5px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.close-button-wrapper {
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
}

.item-info-wrapper {
  padding-right: 28px;
  padding-left: 28px;
}

.description-wrapper {
  height: 150px;
  padding: 10px;
  font-size: 12px;
  border-bottom: white 1px solid;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.item-name {
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
}

.item-sub-name {
  display: flex;
  font-size: 12px;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
}

.level-wrapper {
  width: 90px;
  height: 150px;
  font-size: 19px;
  flex-flow: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: white 1px solid;
}

.top-wrapper {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  display: flex;
  border: white 1px solid;
}

.item-image {
  background-size: 120px;
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 150px;
  border-right: white 1px solid;
}

.close-button-wrapper {
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
}

.location-info {
  background-image: url('public/sprites/background/bgMozaic.png');
  background-size: 150px;
  border: white 1px solid;
  transform: translate(50px, -740px);
  width: 600px;
  height: 650px;
}

.tooltip-body {
  background-image: url('/sprites/background/bgMozaic.png');
  background-size: 150px;
  border: white 1px solid;
  width: 500px;
  height: 700px;
}

.popup-shade {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  position: absolute;
  top: 0;
}
</style>
