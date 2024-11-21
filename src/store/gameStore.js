import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
	state: () => ({
		difficulty: 'easy',
		theme: 'classic',
		cards: [
			{ id: 1, image: 'image1.jpg', text: 'Image 1' },
			{ id: 2, image: 'image2.jpg', text: 'Image 2' },
			{ id: 3, image: 'image3.jpg', text: 'Image 3' },
			{ id: 4, image: 'image4.jpg', text: 'Image 4' },
			{ id: 1, image: 'image1.jpg', text: 'Image 1' },
			{ id: 2, image: 'image2.jpg', text: 'Image 2' },
			{ id: 3, image: 'image3.jpg', text: 'Image 3' },
			{ id: 4, image: 'image4.jpg', text: 'Image 4' },
		],
		shuffledCards: [],
		time: 0,
		timeInterval: null,
		attempts: 0,
		gameStatus: null,
	}),

	actions: {
		startGame() {
			this.time = 0;
			this.generateCards();
			this.timeInterval = setInterval(() => {
				this.time++;
			}, 1000);
		},

		generateCards() {
			//Shuffle cards to randomize their order
			this.cards.sort(() => Math.random() - 0.5);
			// Fill shuffeld cards into shuffledCards array
			this.shuffledCards = this.cards.map((icon) => ({
				id: icon.id,
				icon: icon.image,
				text: icon.text,
			}));
		},
	},
	getters: {
		getTime: (state) => state.time,
		getShuffledCards: (state) => state.shuffledCards,
	},
});
