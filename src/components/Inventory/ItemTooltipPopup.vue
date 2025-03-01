<script setup lang="ts">
import useItemStore from '@/stores/itemStore.ts';
import SubLocationsBlock from '@/components/Lobby/SubLocationsBlock.vue';
import ReputationBlock from '@/components/ReputationBlock.vue';

const itemStore = useItemStore();
</script>

<template>
  <div class="popup-shade">
    <div class="tooltip-body">
      <div class="close-button-wrapper"><div @click="itemStore.unselectItem()">x</div></div>
      <div class="location-info-wrapper">
        <div class="top-wrapper">
          <div
            :style="{ backgroundImage: `url(${selectedLocation.icon})` }"
            class="location-ico"
          ></div>
          <div class="level-wrapper">
            <div>lvl</div>
            <div>
              {{ `${selectedLocation.levelMin}-${selectedLocation.levelMax}` }}
            </div>
          </div>
          <div class="location-name">
            {{ `• ${selectedLocation.name}` }}
          </div>
        </div>
        <div class="description-wrapper">
          {{ selectedLocation.description }}
        </div>
        <reputation-block :current-location="selectedLocation" />
        <sub-locations-block :sub-locations="selectedLocation.subLocations" />
        <div class="to-location-button expedition" @click="onClickSendToLocation">
          <div>To location</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close-button-wrapper {
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
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
