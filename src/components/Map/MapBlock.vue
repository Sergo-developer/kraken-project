<script setup lang="ts">
import { ref, onMounted } from "vue";
import MapMarker from '@/components/Map/MapMarker.vue';

const wrapper = ref<HTMLElement | null>(null);
const map = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startPos = ref({ x: 0, y: 0 });
const scrollPos = ref({ left: 0 });

const startDrag = (event: MouseEvent) => {
  if (!wrapper.value) return;
  isDragging.value = true;

  startPos.value = { x: event.clientX, y: event.clientY };
  scrollPos.value = { left: wrapper.value.scrollLeft };

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (event: MouseEvent) => {
  if (!wrapper.value || !isDragging.value) return;

  const deltaX = startPos.value.x - event.clientX;

  wrapper.value.scrollLeft = scrollPos.value.left + deltaX;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

onMounted(() => {
  if (map.value) {
    map.value.addEventListener("mousedown", startDrag);
  }
});
</script>

<template>
  <div class="map-main-wrapper" ref="wrapper">
    <div class="map" ref="map">
      <map-marker :x="150" :y="230" :title="'Kraken-3'" />
      <map-marker :x="650" :y="-5" :title="'Agricultural complex'" />
    </div>
  </div>
</template>

<style scoped>

.map-main-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}

.map {
  background-image: url("/sprites/map/mapMain.png");
  background-position: center;
  background-size: 1100px;
  background-repeat: no-repeat;
  height: 100%;
  width: 1100px;
}


@keyframes animate-static {
  0% {
    background-image: url("/sprites/map/mapMain0.png");
  }
  50%{
    background-image: url("/sprites/map/mapMain1.png");
  }
  100% {
    background-image: url("/sprites/map/mapMain2.png");
  }
}
</style>
