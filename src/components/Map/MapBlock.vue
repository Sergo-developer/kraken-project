<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MapMarker from '@/components/Map/MapMarker.vue';
import LocationPopup from '@/components/Map/LocationPopup.vue';
import { allLocations, type AllLocations } from '@/utilites/LocationsList.ts';

const wrapper = ref<HTMLElement | null>(null);
const map = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startPos = ref({ x: 0, y: 0 });
const scrollPos = ref({ left: 0 });
const selectedLocation = ref<AllLocations | null>(null);

const closePopup = () => {
  selectedLocation.value = null;
};

const selectLocation = (name: string) => {
  selectedLocation.value = allLocations[name] ?? null;
};

const startDrag = (event: MouseEvent) => {
  if (!wrapper.value) return;
  isDragging.value = true;

  startPos.value = { x: event.clientX, y: event.clientY };
  scrollPos.value = { left: wrapper.value.scrollLeft };

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (event: MouseEvent) => {
  if (!wrapper.value || !isDragging.value) return;

  const deltaX = startPos.value.x - event.clientX;

  wrapper.value.scrollLeft = scrollPos.value.left + deltaX;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

onMounted(() => {
  if (map.value) {
    map.value.addEventListener('mousedown', startDrag);
  }
});
</script>

<template>
  <div class="map-wrapper">
    <div ref="wrapper" class="map-main-wrapper">
      <div ref="map" class="map-main-layer">
        <div class="map">
          <map-marker :x="50" :y="230" :title="'Mayda-3'" @click="selectLocation('Mayda-3')" />
          <map-marker :x="500" :y="70" :title="'City'" @click="selectLocation('City')" />
          <map-marker :x="500" :y="160" :title="'Port'" @click="selectLocation('Port')" />
          <map-marker
            :x="825"
            :y="-160"
            :title="'Greenhouse'"
            @click="selectLocation('Greenhouse')"
          />
        </div>
      </div>
    </div>
    <location-popup :selectedLocation @close-popup="closePopup" />
  </div>
</template>

<style scoped>
.map-main-layer {
  background-position: center;
  background-size: 80px;
  height: 100%;
  width: 1100px;
  animation: animate-sea infinite 1s steps(1);
}

@keyframes button-slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}

.map-wrapper {
  width: 100%;
  height: 100%;
}

.map-main-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}

.map {
  background-image: url('/sprites/map/newMap.png');
  background-position: top;
  background-size: 1100px;
  background-repeat: no-repeat;
  height: 100%;
  width: 1100px;
}

@keyframes animate-sea {
  0% {
    background-image: url('/sprites/map/sea.png');
  }
  25% {
    background-image: url('/sprites/map/sea0.png');
  }
  75% {
    background-image: url('/sprites/map/sea1.png');
  }
  100% {
    background-image: url('/sprites/map/sea0.png');
  }
}
</style>
