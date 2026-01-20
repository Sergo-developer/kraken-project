import type { PiniaPluginContext } from 'pinia';

const STORAGE_KEY_PREFIX = 'kraken_';

const persistState = ({ store }: PiniaPluginContext) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${store.$id}`;

  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  store.$subscribe((_mutation, state) => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  });
};

export default persistState;
