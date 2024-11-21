<template>
	<header>
		<AppButton title="Start Game" @click="gameStore.startGame" />
		<DropdownFilters v-if="gameStore.gameStatus !== 'in progress'" />
		<TimeCounter />
		<AttemptCounter />
	</header>
	<GameBoard />
	<BestResults />
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import TimeCounter from '@/components/TimeCounter.vue';
import AttemptCounter from './components/AttemptCounter.vue';
import BestResults from './components/BestResults.vue';
import GameBoard from '@/components/GameBoard.vue';
import { useGameStore } from '@/store/gameStore';
import DropdownFilters from './components/DropdownFilters.vue';

const gameStore = useGameStore();
</script>
