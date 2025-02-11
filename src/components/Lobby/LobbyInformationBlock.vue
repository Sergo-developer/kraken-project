<script setup lang="ts">
import type { AllLocations } from '@/utilites/LocationsList.ts';
import ReputationBlock from '@/components/ReputationBlock.vue';
import SubLocationsBlock from '@/components/Lobby/SubLocationsBlock.vue';

const { currentLocation } = defineProps<{ currentLocation: AllLocations }>();
</script>

<template>
  <div class="location-wrapper">
    <div class="location-main-block">
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>{{ `${currentLocation.levelMin}-${currentLocation.levelMax}` }}</div>
      </div>
      <div class="location-name">{{ `• ${currentLocation.name}` }}</div>
    </div>
    <reputation-block :currentLocation />
    <sub-locations-block :sub-locations="currentLocation.subLocations" />
  </div>
</template>

<style scoped>
.location-name {
  display: flex;
  margin-left: 20px;
  justify-content: center;
}

.location-level-wrapper {
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 70px;
  height: 100%;
}

.small-text {
  font-size: 10px;
}

.location-main-block {
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px white solid;
  background-color: rgba(0, 0, 0, 0.25);
}

.location-wrapper {
  width: 50%;
  height: auto;
}
</style>
