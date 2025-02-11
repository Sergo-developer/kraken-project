<script setup lang="ts">
import type { AllLocations } from '@/utilites/LocationsList.ts';
const reputation = ['I', 'II', 'III', 'IV', 'V'];
const {currentLocation} = defineProps<{currentLocation: AllLocations}>()
</script>
<template>
  <div class="location-reputation-block">
    <div class="small-text">reputation</div>
    <div class="reputation-elements-wrapper">
      <div
        class="reputation-element-wrapper"
        v-for="(rep, i) in currentLocation.reputation"
        :key="i"
      >
        <div class="reputation-element">{{ reputation[i] }}</div>
        <div
          v-if="i != currentLocation.reputation.length - 1"
          class="reputation-element-divider"
        ></div>
      </div>
    </div>
    <div class="small-text">III - из плеерсторы</div>
  </div>
</template>
<style scoped>

.location-reputation-block {
  gap: 3px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-bottom: 1px white solid;
  border-left: 1px white solid;
  border-right: 1px white solid;
  background-color: rgba(0, 0, 0, 0.25);
}

.small-text {
  font-size: 10px;
}

.reputation-elements-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.reputation-element-wrapper {
  display: flex;
  align-items: center;
}
.reputation-element-divider {
  height: 3px;
  width: 16px;
  background-color: white;
}

.reputation-element {
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: white 3px solid;
  border-radius: 30px;
}

.reputation-elements-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.reputation-element-wrapper {
  display: flex;
  align-items: center;
}

.reputation-element-divider {
  height: 3px;
  width: 16px;
  background-color: white;
}

.reputation-element {
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: white 3px solid;
  border-radius: 30px;
}

</style>
