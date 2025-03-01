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
    if (!itemToAdd) return; // Проверяем, найден ли предмет

    const inventoryToAdd = inventoryItems.value;

    const existingItem = inventoryToAdd.find((item) => item?.name === itemName);
    if (existingItem) {
      if (existingItem.count !== false) {
        existingItem.count = (existingItem.count || 1) + 1;
      }
    } else {
      const emptySlotIndex = inventoryToAdd.findIndex((item) => !item);
      if (emptySlotIndex !== -1) {
        inventoryToAdd[emptySlotIndex] = {
          ...itemToAdd,
          count: itemToAdd.count === false ? false : 1,
        };
      }
    }

    inventoryItems.value = inventoryToAdd;
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryToAdd));
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
