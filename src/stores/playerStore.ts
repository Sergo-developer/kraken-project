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

  const userFromStore = localStorage.getItem('player');
  if (userFromStore) {
    player.value = JSON.parse(userFromStore);
  }

  const setUserData = (userData: Player) => {
    player.value = userData;
    localStorage.setItem('player', JSON.stringify(userData));
  };

  return {
    player,
    setUserData,
  };
});

export default usePlayerStore;
