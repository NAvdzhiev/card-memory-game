import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
	state: () => ({
		grid: 4,
		theme: 'classic',
		cards: [
			{ id: 1, image: 'image1.jpg', text: 'Image 1' },
			{ id: 2, image: 'image2.jpg', text: 'Image 2' },
			{ id: 3, image: 'image3.jpg', text: 'Image 3' },
			{ id: 4, image: 'image4.jpg', text: 'Image 4' },
			{ id: 5, image: 'image1.jpg', text: 'Image 1' },
			{ id: 6, image: 'image2.jpg', text: 'Image 2' },
			{ id: 7, image: 'image3.jpg', text: 'Image 3' },
			{ id: 8, image: 'image4.jpg', text: 'Image 4' },
		],
		shuffledCards: [],
		flippedCards: [],
		matchedCards: [],
		blockInteraction: false,
		time: 0,
		timeInterval: null,
		attempts: 0,
		gameStatus: null,
	}),

	actions: {
		startGame() {
			this.time = 0;
			this.generateCards();
			this.matchedCards = [];
			this.flippedCards = [];
			this.attempts = 0;
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

		// Set Grid Size Logic
		setGridSize(seletedSize) {
			this.grid = seletedSize;
		},

		// Set Game Theme Logic
		setTheme(selectedTheme) {
			this.theme = selectedTheme;
		},

		// Flip Card Logic
		flipCard(cardId) {
			// Block interaction or ignore already flipped/matched cards
			const isFlipped = this.flippedCards.includes(cardId);
			if (this.blockInteraction || isFlipped) {
				return;
			}

			// Add flipped card to flippedCards array
			const card = this.shuffledCards.find((c) => c.id === cardId);
			if (card.disabled) return; // Don't flip if the card is disabled

			// Flip the card to show its front
			card.flipped = true;
			this.flippedCards.push(cardId);

			// If two cards are flipped, check for match
			if (this.flippedCards.length === 2) {
				// Block interaction until the result is evaluated
				this.blockInteraction = true;
				this.attempts++;

				const [firstCardId, secondCardId] = this.flippedCards;
				const card1 = this.shuffledCards.find(
					(card) => card.id === firstCardId,
				);
				const card2 = this.shuffledCards.find(
					(card) => card.id === secondCardId,
				);

				if (card1.text === card2.text) {
					// Match found
					this.matchedCards.push(card1, card2);
					this.flippedCards = [];
					this.blockInteraction = false;
				} else {
					// Reset flippedCards after 2 seconds
					setTimeout(() => {
						this.flippedCards = [];
						this.blockInteraction = false;
					}, 2000);
				}
			}
		},

		// Check if game is completed logic
		checkGameComplete() {
			if (this.matchedCards.length === this.shuffledCards.length) {
				this.saveGameResults();
				this.gameStatus = 'completed';
				// Stop the timer without clearing the interval
				if (this.timeInterval) {
					clearInterval(this.timeInterval);
					this.timeInterval = null; // Set the interval to null to avoid multiple intervals
				}
			}
		},

		saveGameResults() {
			//Save current attempts and time to localStorage
			const gameResults = {
				attempts: this.attempts,
				time: this.time,
			};

			const results = JSON.parse(localStorage.getItem('myResults')) || [];
			results.push(gameResults);
			localStorage.setItem('myResults', JSON.stringify(results));
		},
	},
	getters: {
		getTime: (state) => state.time,
		getShuffledCards: (state) => state.shuffledCards,
		getBestAttempts: () => {
			const results = JSON.parse(localStorage.getItem('myResults')) || [];

			// Sort top 3 results by attempts (ascending)
			const sortedResults = results.sort((a, b) => a.attempts - b.attempts);
			return sortedResults.slice(0, 3);
		},
		getBestTime: () => {
			const results = JSON.parse(localStorage.getItem('myResults')) || [];

			// Sort top 3 results by time (ascending)
			const sortedResults = results.sort((a, b) => a.time - b.time);
			return sortedResults.slice(0, 3);
		},
	},
});
