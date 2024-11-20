import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
	state: () => ({
		time: 0,
		timeInterval: null,
	}),

	actions: {
		startGame() {
			this.time = 0;
			this.timeInterval = setInterval(() => {
				this.time++;
			}, 1000);
		},
	},
	getters: {
		getTime: (state) => state.time,
	},
});
