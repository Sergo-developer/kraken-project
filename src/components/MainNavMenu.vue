<script setup lang="ts">
//кнопка назад будет потом высчитываться в зависимости в какой месте находится игрок, вооот
</script>

<template>
  <div class="nav-menu">
    <router-link :to="'lobby'" class="nav-menu-button">{{'<<'}}</router-link>
    <router-link :to="'map'" class="nav-menu-button">Map</router-link>
    <div class="nav-menu-button">Quests</div>
    <div class="nav-menu-button">Inventory</div>
  </div>
</template>

<style scoped>
.nav-menu-button {
  color: #181818;
  background-color: #ababab;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px black solid;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}
.nav-menu-button:hover {
  transition: 0.2s;
  color: black;
  background-color: #c9c9c9;
}

.nav-menu {
  display: flex;
}
</style>
