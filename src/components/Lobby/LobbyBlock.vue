<script setup lang="ts">
import PlayerBars from '@/components/PlayerBars.vue';
import LobbyInformationBlock from '@/components/Lobby/LobbyInformationBlock.vue';
import useLocationStore from '@/stores/locationStore.ts';
import router from '@/router';
import { storeToRefs } from 'pinia';
const locationStore = useLocationStore();
const { currentLocation, currentSubLocation } = storeToRefs(locationStore);

const onClickToExpedition = () => {
  if (currentSubLocation.value) {
    router.push('game');
  }
};
</script>

<template>
  <div :style="{ backgroundImage: `url(${currentLocation.background})` }" class="lobby-image">
    Переделай как-то бары бля...
  </div>
  <player-bars />
  <div class="lobby-wrapper">
    <lobby-information-block :currentLocation />
    <div class="lobby-interactive-block">
      <div class="lobby-button expedition" @click="onClickToExpedition()">
        <div v-if="!currentSubLocation">...</div>
        <div v-else class="subLocation-button-info">
          <span>In expedition</span>
          <span>{{ `"${currentSubLocation?.name}"` }}</span>
        </div>
      </div>
      <div class="lobby-bottom-buttons">
        <router-link :to="'merchant'" class="lobby-button">Merchant</router-link>
        <div class="lobby-button">Quests</div>
        <div class="lobby-button">Stash</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subLocation-button-info {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.location-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  height: 32px;
  width: 32px;
}

.lobby-bottom-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
}

.lobby-wrapper {
  gap: 5px;
  display: flex;
}

.lobby-button {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border: 1px solid white;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.lobby-button.expedition {
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.25) 0%,
    rgba(255, 0, 0, 0.13) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.lobby-button:hover {
  background: none;
  color: yellow;
}
.lobby-button.expedition:hover {
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

.lobby-interactive-block {
  width: 50%;
  gap: 5px;
  display: flex;
  flex-flow: column;
}

.lobby-image {
  background-size: 800px;
  background-position: center;
  width: 100%;
  height: 400px;
}
</style>
