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
import { ref, computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();
const shuffledCards = computed(() => gameStore.getShuffledCards);
const flippedCards = ref([]);
const matchedCards = ref([]);
</script>

<style scoped>
.game-board {
	display: flex;
	justify-content: space-between;
}
</style>
