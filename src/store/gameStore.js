import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
	state: () => ({
		difficulty: 'easy',
		theme: 'classic',
		cards: [],
		time: 0,
		timeInterval: null,
		attempts: 0,
		gameStatus: null,
	}),

	actions: {
		startGame() {
			this.time = 0;
			this.gameStatus = 'in progress';
			this.timeInterval = setInterval(() => {
				this.time++;
			}, 1000);
		},
	},
	getters: {
		getTime: (state) => state.time,
	},
});
