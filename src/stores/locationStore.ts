import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AllLocations, SubLocations } from '@/utilites/LocationsList.ts';
import { allLocations } from '@/utilites/LocationsList.ts';

const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref<AllLocations>(allLocations['Kraken-3']);
  const currentSubLocations = ref<SubLocations>();

  const locationFromStore = localStorage.getItem('currentLocation');
  if (locationFromStore) {
    currentLocation.value = JSON.parse(locationFromStore);
  }

  const setLocation = (locationToSet: AllLocations) => {
    currentLocation.value = locationToSet;
    localStorage.setItem('currentLocation', JSON.stringify(locationToSet));
  };

  return {
    currentLocation,
    currentSubLocations,
    setLocation,
  };
});

export default useLocationStore;
