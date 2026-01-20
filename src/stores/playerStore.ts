import { defineStore } from 'pinia';
import { ref } from 'vue';

type Player = {
  name: string;
  health: number;
  maxHealth: number;
  oxygen: number;
  maxOxygen: number;
  level: number;
  experience: number;
};

const usePlayerStore = defineStore('playerStore', () => {
  const player = ref<Player | undefined>();

  const setUserData = (userData: Player) => {
    player.value = userData;
  };

  return {
    player,
    setUserData,
  };
});

export default usePlayerStore;
