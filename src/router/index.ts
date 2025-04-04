import { createRouter, createWebHistory } from 'vue-router';
import MainBlock from '@/components/MainBlock.vue';
import MapBlock from '@/components/Map/MapBlock.vue';
import MerchantBlock from '@/components/Merchant/MerchantBlock.vue';
import InventoryBlock from '@/components/Inventory/InventoryBlock.vue';
import LobbyBlock from '@/components/Lobby/LobbyBlock.vue';
import GameBlock from '@/components/GameBlock.vue';
import mapEditorMainBlock from '@/components/mapEditor/mapEditorMainBlock.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map-editor',
      name: 'map-editor',
      component: mapEditorMainBlock,
    },
    {
      path: '/',
      name: 'main',
      component: MainBlock,
      children: [
        {
          path: 'game',
          name: 'game',
          component: GameBlock,
        },
        {
          path: 'map',
          name: 'map',
          component: MapBlock,
        },
        {
          path: 'inventory',
          name: 'inventory',
          component: InventoryBlock,
        },
        {
          path: 'lobby',
          name: 'lobby',
          component: LobbyBlock,
        },
        {
          path: 'merchant',
          name: 'merchant',
          component: MerchantBlock,
        },
      ],
    },
  ],
});

export default router;
