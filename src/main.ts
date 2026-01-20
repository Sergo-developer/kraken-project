import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import persistState from './plugins/persistState';

const pinia = createPinia();
pinia.use(persistState);

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
