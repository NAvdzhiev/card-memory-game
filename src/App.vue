<template>
	<header>
		<AppButton title="Start Game" @click="gameStore.startGame" />
		<TimeCounter />
		<AttemptCounter />
		<BestResults />
	</header>
	<GameBoard />
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import TimeCounter from '@/components/TimeCounter.vue';
import AttemptCounter from './components/AttemptCounter.vue';
import BestResults from './components/BestResults.vue';
import GameBoard from '@/components/GameBoard.vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();
</script>
