import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Item } from '@/utilites/ItemsList.ts';
import { allItemsList } from '@/utilites/ItemsList.ts';

const useItemStore = defineStore('itemStore', () => {
  const inventoryItems = ref<Item[] | []>(new Array(40));

  const selectedItem = ref<Item | null>(null);

  const inventoryFromStore = localStorage.getItem('inventoryItems');
  if (inventoryFromStore) {
    inventoryItems.value = JSON.parse(inventoryFromStore);
  }

  const addInventoryItems = (itemName: string) => {
    const itemToAdd = structuredClone(allItemsList.find((item) => item.name === itemName));
    if (!itemToAdd) return;

    for (let i = 0; i < inventoryItems.value.length; i++) {
      if (inventoryItems.value[i]?.name === itemToAdd.name && itemToAdd.isStackable) {
        inventoryItems.value[i].count += 1;
        break;
      } else if (inventoryItems.value[i] === null) {
        inventoryItems.value[i] = itemToAdd;
        break;
      }
    }
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems.value));
  };

  const selectItem = (item: Item) => {
    selectedItem.value = item;
  };

  const unselectItem = () => {
    selectedItem.value = null;
  };

  return {
    inventoryItems,
    addInventoryItems,
    selectItem,
    selectedItem,
    unselectItem,
  };
});

export default useItemStore;
