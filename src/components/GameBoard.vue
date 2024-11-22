<template>
	<div
		class="game-board"
		:style="{
			gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
			gridTemplateRows: `repeat(${gridSize}, 1fr)`,
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

const gridSize = computed(() => gameStore.grid);

const shuffledCards = computed(() => gameStore.getShuffledCards);

// Watch if game is completed by checking matchedCards array length
watch(
	() => gameStore.matchedCards.length,
	() => {
		gameStore.checkGameComplete();
	},
);
</script>

<style scoped>
.game-board {
	display: grid;
	gap: 20px;
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
}
</style>
