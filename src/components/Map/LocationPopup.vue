<script setup lang="ts">
import router from '@/router/index.js';
import useLocationStore from '@/stores/locationStore.ts';
import type { AllLocations } from '@/utilites/LocationsList.ts';
import ReputationBlock from '@/components/ReputationBlock.vue';
import SubLocationsBlock from '@/components/Lobby/SubLocationsBlock.vue';
const locationStore = useLocationStore();
const { selectedLocation } = defineProps<{ selectedLocation: AllLocations | null }>();

const onClickSendToLocation = () => {
  if (selectedLocation === null) {
    return;
  }
  locationStore.setLocation(selectedLocation);
  router.push('/lobby');
};
</script>

<template>
  <div v-if="selectedLocation !== null" class="location-info">
    <div class="close-button-wrapper">
      <div @click="$emit('close-popup')">x</div>
    </div>
    <div class="item-info-wrapper">
      <div class="top-wrapper">
        <div
          :style="{ backgroundImage: `url(${selectedLocation.icon})` }"
          class="item-image"
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
      <div class="use-button expedition" @click="onClickSendToLocation">
        <div>To location</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.use-button {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border: 1px solid white;
  border-top: none;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.25) 0%,
    rgba(255, 0, 0, 0.13) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.use-button:hover {
  text-shadow: black 0 3px 3px;
  background-size: 160px;
  background-image: url('/sprites/background/bgMozaicRed.png');
  animation: button-slide 10s linear infinite;
  color: red;
}

@keyframes button-slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}

.item-info-wrapper {
  margin-left: 28px;
  margin-right: 28px;
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

.location-name {
  font-size: 28px;
  margin-left: 20px;
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
  align-items: center;
  display: flex;
  border: white 1px solid;
}

.item-image {
  background-size: 150px;
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
</style>
