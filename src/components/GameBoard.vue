<template>
	<div
		class="game-board"
		:style="{
			'--grid-size': gridSize,
			'--cell-size': calculateCellSize() + 'px',
			'--gap-size': calculateGapSize() + 'px',
		}"
	>
		<SingleCard
			v-for="card in shuffledCards"
			:id="card.id"
			:cardImage="require(`@/assets/${gameStore.theme}/${card.icon}`)"
			:cardAltTxt="card.text"
			:key="card.id"
		/>
	</div>
</template>

<script setup>
import SingleCard from './SingleCard.vue';
import { watch, computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();

const shuffledCards = gameStore.getShuffledCards;

// Watch if game is completed by checking matchedCards' array length
watch(
	() => gameStore.matchedCards.length,
	() => {
		gameStore.checkGameComplete();
	},
);

const gridSize = computed(() => gameStore.grid);

const calculateCellSize = () => {
	const screenSize = Math.min(window.innerWidth, window.innerHeight);
	return Math.floor(screenSize / (gridSize.value + 1));
};

const calculateGapSize = () => Math.floor(calculateCellSize() * 0.075);
</script>

<style scoped>
.game-board {
	display: grid;
	grid-template-columns: repeat(var(--grid-size), var(--cell-size));
	grid-template-rows: repeat(var(--grid-size), var(--cell-size));
	gap: var(--gap-size);
	justify-content: center;
	align-items: center;
	margin: auto;
	max-width: 100%;
}
</style>
