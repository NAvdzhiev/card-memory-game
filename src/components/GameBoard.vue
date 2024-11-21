<template>
	<div class="game-board">
		<SingleCard
			v-for="card in shuffledCards"
			:id="card.id"
			:cardImage="card.image"
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
	display: flex;
	justify-content: space-between;
}
</style>
