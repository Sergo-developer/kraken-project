<script setup lang="ts">

import MainNavMenu from '@/components/MainNavMenu.vue';
import ValueBlock from '@/components/CurrencyBlock.vue';
</script>

<template>
  <div class="main-wrapper">
    <div class="main-game-block">
      <value-block />
      <router-view />
    </div>
    <MainNavMenu />
  </div>
</template>

<style scoped>
.main-game-block {
  height: 100%;
}

.main-wrapper {
  width: 700px;
  height: 800px;
  background-image: url("public/sprites/background/bgMozaic.png");
  background-size: 150px;
}
</style>
