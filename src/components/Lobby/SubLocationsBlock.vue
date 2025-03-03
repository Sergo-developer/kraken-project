<script setup lang="ts">
import type { SubLocations } from '@/utilites/LocationsList.ts';
import useLocationStore from '@/stores/locationStore.ts';

const { subLocations } = defineProps<{ subLocations: SubLocations }>();
const { setSubLocation } = useLocationStore();
</script>
<template>
  <div v-for="(location, i) in subLocations" :key="i">
    <div class="sub-location-block" @click="setSubLocation(location)">
      <div :class="location.type" class="location-icon raid"></div>
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>{{ `${location.levelMin}-${location.levelMax}` }}</div>
      </div>
      <div class="location-name">{{ `• ${location.name}` }}</div>
    </div>
  </div>
</template>
<style scoped>
.sub-location-block {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px white solid;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
.sub-location-block:hover {
  background: none;
}

.location-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  height: 32px;
  width: 32px;
}

.location-icon.dungeon {
  background-image: url('../../../public/sprites/smallIcons/skull0.png');
}

.location-icon.close {
  background-image: url('../../../public/sprites/smallIcons/arrows.png');
}

.location-icon.open {
  background-image: url('../../../public/sprites/smallIcons/oxygen.png');
}

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
</style>
