import { createRouter, createWebHistory } from 'vue-router';
import { useGameStore } from './store/gameStore';
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
		name: 'Game',
		component: GamePage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const gameStore = useGameStore();
	gameStore.isLoading = true;

	if (to.name === 'Game' && gameStore.gameStatus === 'start') {
		next('/');
	} else {
		next();
	}
});

router.afterEach(() => {
	setTimeout(() => {
		const gameStore = useGameStore();
		gameStore.isLoading = false;
	}, 500);
});

export default router;
