import { createRouter, createWebHistory } from 'vue-router';
import MainBlock from '@/components/MainBlock.vue';
import MapBlock from '@/components/Map/MapBlock.vue';
import Lobby from '@/components/Lobby/Lobby.vue';
import MerchantBlock from '@/components/Merchant/MerchantBlock.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainBlock,
      children: [
        {
          path: 'map',
          name: 'map',
          component: MapBlock,
        },
        {
          path: 'lobby',
          name: 'lobby',
          component: Lobby,
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
