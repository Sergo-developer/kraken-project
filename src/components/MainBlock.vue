<script setup lang="ts">
import MainNavMenu from '@/components/MainNavMenu.vue';
import ValueBlock from '@/components/CurrencyBlock.vue';
</script>

<template>
  <div class="main-wrapper">
    <value-block />
    <div class="main-game-block">
      <router-view />
    </div>
    <main-nav-menu />
  </div>
</template>

<style scoped>
.main-game-block {
  background-image: url('public/sprites/background/bgMozaic.png');
  background-size: 150px;
  height: 100%;
}

.main-wrapper {
  display: block;
  width: 700px;
  height: 800px;
}
</style>
