<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MapMarker from '@/components/Map/MapMarker.vue';
import { allLocations, type AllLocations } from '@/utilites/LocationsList.ts';
import ReputationBlock from '@/components/ReputationBlock.vue';
import SubLocationsBlock from '@/components/Lobby/SubLocationsBlock.vue';
import useLocationStore from '@/stores/locationStore.ts';
import router from '@/router';

const wrapper = ref<HTMLElement | null>(null);
const map = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startPos = ref({ x: 0, y: 0 });
const scrollPos = ref({ left: 0 });
const locationStore = useLocationStore();
const selectedLocation = ref<AllLocations | null>(null);

const onClickSendToLocation = () => {
  if (selectedLocation.value === null) {
    return;
  }
  locationStore.setLocation(selectedLocation.value);
  router.push('/lobby');
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
    <div v-if="selectedLocation != null" class="location-info">
      <div class="close-button-wrapper"><div @click="selectedLocation = null">x</div></div>
      <div class="location-info-wrapper">
        <div class="top-wrapper">
          <div
            :style="{ backgroundImage: `url(${selectedLocation.icon})` }"
            class="location-ico"
          ></div>
          <div class="level-wrapper">
            <div>lvl</div>
            <div>
              {{ `${selectedLocation.levelMin}-${selectedLocation.levelMax}` }}
            </div>
          </div>
          <div class="location-name">
            {{ `• ${selectedLocation.name}` }}
          </div>
        </div>
        <div class="description-wrapper">
          {{ selectedLocation.description }}
        </div>
        <reputation-block :current-location="selectedLocation" />
        <sub-locations-block :sub-locations="selectedLocation.subLocations" />
        <div class="to-location-button expedition" @click="onClickSendToLocation">
          <div>To location</div>
        </div>
      </div>
    </div>
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

.to-location-button {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border: 1px solid white;
  border-top: none;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.25) 0%,
    rgba(255, 0, 0, 0.13) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.to-location-button:hover {
  text-shadow: black 0 3px 3px;
  background-size: 160px;
  background-image: url('/sprites/background/bgMozaicRed.png');
  animation: button-slide 10s linear infinite;
  color: red;
}

@keyframes button-slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}

.location-info-wrapper {
  margin-left: 28px;
  margin-right: 28px;
}

.description-wrapper {
  height: 150px;
  padding: 10px;
  font-size: 12px;
  border-bottom: white 1px solid;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.location-name {
  font-size: 28px;
  margin-left: 20px;
}

.level-wrapper {
  width: 90px;
  height: 150px;
  font-size: 19px;
  flex-flow: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: white 1px solid;
}

.top-wrapper {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  align-items: center;
  display: flex;
  border: white 1px solid;
}

.location-ico {
  background-size: 150px;
  width: 150px;
  height: 150px;
  border-right: white 1px solid;
}
.close-button-wrapper {
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
}

.map-wrapper {
  width: 100%;
  height: 100%;
}

.location-info {
  background-image: url('public/sprites/background/bgMozaic.png');
  background-size: 150px;
  border: white 1px solid;
  transform: translate(50px, -740px);
  width: 600px;
  height: 650px;
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
