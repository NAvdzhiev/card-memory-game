import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import GamePage from './views/GamePage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/game',
		name: 'GamePage',
		component: GamePage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
