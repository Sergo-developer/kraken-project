<script setup lang="ts">
const props = defineProps<{x: number, y: number, title: string}>()
</script>

<template>
  <div :style="{transform: `translateX(${props.x}px) translateY(${props.y}px)`}" class="marker"></div>
</template>

<style scoped>
.marker {
  cursor: pointer;
  background-image: url("/public/sprites/map/marker.png");
  background-size: 40px;
  height: 40px;
  width: 40px;
}
.marker:hover {
  filter: drop-shadow(-2px 0 0 #ffffff)drop-shadow(2px 0 0 #ffffff)drop-shadow(0 -2px 0 #ffffff)drop-shadow(0 2px 0 #ffffff);
}
</style>
