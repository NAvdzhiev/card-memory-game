import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import css from '@/assets/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(css);
app.mount('#app');
