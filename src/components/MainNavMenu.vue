<script setup lang="ts">
//кнопка назад будет потом высчитываться в зависимости в какой месте находится игрок, вооот
import useLocationStore from '@/stores/locationStore.ts';
const locationStore = useLocationStore();
const setBackButtonValue = () => {
  if (locationStore.currentSubLocation) {
    return 'game';
  } else if (locationStore.currentLocation) {
    return 'lobby';
  } else return 'map';
};
</script>

<template>
  <div class="nav-menu">
    <router-link :to="setBackButtonValue()" class="nav-menu-button">{{ '<<' }}</router-link>
    <router-link :to="'map'" class="nav-menu-button">Map</router-link>
    <router-link :to="'map-editor'" class="nav-menu-button">Map-editor</router-link>
    <router-link :to="'inventory'" class="nav-menu-button">Inventory</router-link>
    <div class="nav-menu-button">Status</div>
  </div>
</template>

<style scoped>
.nav-menu-button {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border-top: 1px solid white;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
.nav-menu-button:hover {
  transition: 0.2s;
  color: black;
  background-color: #c9c9c9;
}

.nav-menu {
  height: 50px;
  display: flex;
}
</style>
