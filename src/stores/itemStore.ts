import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Item } from '@/utilites/ItemsList.ts';
import { allItemsList } from '@/utilites/ItemsList.ts';

const useItemStore = defineStore('itemStore', () => {
  const inventoryItems = ref<Item[] | []>(new Array(40));

  const selectedItem = ref<Item | null>(null);

  const addInventoryItems = (itemName: string) => {
    const itemToAdd = structuredClone(allItemsList.find((item) => item.name === itemName));
    if (!itemToAdd) {
      return;
    }

    for (let i = 0; i < inventoryItems.value.length; i++) {
      if (inventoryItems.value[i]?.name === itemToAdd.name && itemToAdd.isStackable) {
        inventoryItems.value[i].count += 1;
        return;
      }
    }

    for (let i = 0; i < inventoryItems.value.length; i++) {
      if (!inventoryItems.value[i]) {
        inventoryItems.value[i] = itemToAdd;
        return;
      }
    }
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
