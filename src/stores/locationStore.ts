import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AllLocations, SubLocations } from '@/utilites/LocationsList.ts';
import { allLocations } from '@/utilites/LocationsList.ts';

const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref<AllLocations>(allLocations['Kraken-3']);
  const currentSubLocation = ref<SubLocations>();

  const locationFromStore = localStorage.getItem('currentLocation');
  if (locationFromStore) {
    currentLocation.value = JSON.parse(locationFromStore);
  }

  const setLocation = (locationToSet: AllLocations) => {
    currentLocation.value = locationToSet;
    localStorage.setItem('currentLocation', JSON.stringify(locationToSet));
  };

  const setSubLocation = (SubLocationToSet: SubLocations) => {
    currentSubLocation.value = SubLocationToSet;
  };

  return {
    currentLocation,
    currentSubLocation,
    setSubLocation,
    setLocation,
  };
});

export default useLocationStore;
