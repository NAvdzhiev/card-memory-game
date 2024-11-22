import { defineStore } from 'pinia';
import wildlifeTheme from '@/data/wildlife.json';
import farmTheme from '@/data/farm.json';
import spaceTheme from '@/data/space.json';
import { playSound } from '@/utils/sounds';
import flipSound from '@/assets/sounds/flip.mp3';
import winSound from '@/assets/sounds/win.mp3';
import matchSound from '@/assets/sounds/match.mp3';

export const useGameStore = defineStore('game', {
	state: () => ({
		grid: 4,
		theme: 'farm',
		shuffledCards: [],
		flippedCards: [],
		matchedCards: [],
		blockInteraction: false,
		time: 0,
		timeInterval: null,
		attempts: 0,
		gameStatus: 'start',
		isLoading: false,
	}),

	actions: {
		startGame() {
			this.gameStatus = 'in progress';
			this.time = 0;
			this.generateCards();
			this.matchedCards = [];
			this.flippedCards = [];
			this.attempts = 0;

			// Clear existing interval - for restart
			if (this.timeInterval) {
				clearInterval(this.timeInterval);
				this.timeInterval = null;
			}

			this.timeInterval = setInterval(() => {
				if (this.gameStatus === 'in progress') {
					this.time++;
				}
			}, 1000);
		},

		generateCards() {
			//Select cards based on theme
			let themeCards = [];
			if (this.theme === 'wildlife') {
				themeCards = wildlifeTheme;
			} else if (this.theme === 'space') {
				themeCards = spaceTheme;
			} else {
				themeCards = farmTheme;
			}

			//Shuffle cards to randomize their order
			themeCards.sort(() => Math.random() - 0.5);

			//Determine number of pairs, based on grid size
			const length = (this.grid * this.grid) / 2;
			const selectedCards = themeCards.slice(0, length);

			// Fill shuffeld cards into shuffledCards array
			this.shuffledCards = [...selectedCards, ...selectedCards].map(
				(icon, index) => ({
					id: index + 1,
					icon: icon.image,
					text: icon.text,
				}),
			);

			this.shuffledCards.sort(() => Math.random() - 0.5);
		},

		// Set Grid Size Logic
		setGridSize(seletedSize) {
			this.grid = seletedSize;
		},

		// Set Game Theme Logic
		setTheme(selectedTheme) {
			this.theme = selectedTheme;
		},

		pauseGame() {
			this.gameStatus = 'paused';
			this.blockInteraction = true;
		},
		resetGame() {
			this.gameStatus = 'in progress';
			this.blockInteraction = false;
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
			playSound(flipSound);
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
					playSound(matchSound);
					this.matchedCards.push(card1, card2);
					this.flippedCards = [];
					this.blockInteraction = false;
				} else {
					// Reset flippedCards after 2 seconds
					setTimeout(() => {
						this.flippedCards = [];
						this.blockInteraction = false;
						playSound(flipSound);
					}, 2000);
				}
			}
		},

		// Check if game is completed logic
		checkGameComplete() {
			if (this.matchedCards.length === this.shuffledCards.length) {
				playSound(winSound);
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
