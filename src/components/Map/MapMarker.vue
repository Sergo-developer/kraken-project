<script setup lang="ts">
const props = defineProps<{ x: number; y: number; title: string }>();
</script>

<template>
  <div
    class="marker-wrapper"
    :style="{ transform: `translateX(${props.x}px) translateY(${props.y}px)` }"
  >
    <div class="marker-title">{{ props.title }}</div>
    <div class="marker"></div>
  </div>
</template>

<style scoped>
.marker-wrapper {
  position: marker;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  color: white;
  width: 100px;
}

.marker-title {
}

.marker {
  cursor: pointer;
  background-image: url('/sprites/map/marker.png');
  background-size: 40px;
  height: 40px;
  width: 40px;
}
.marker:hover {
  filter: drop-shadow(-2px 0 0 #ffffff) drop-shadow(2px 0 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)
    drop-shadow(0 2px 0 #ffffff);
}
</style>
