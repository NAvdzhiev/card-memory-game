<template>
	<header class="header" v-if="gameStore.gameStatus === 'in progress'">
		<nav class="nav">
			<ul class="nav__menu">
				<li class="nav__menu-item">
					<AppButton title="Reset Game" @click="gameStore.startGame" />
				</li>
				<li class="nav__menu-item">
					<TimeCounter />
					<AttemptCounter />
				</li>
				<li class="nav__menu-item">
					<button @click="openDialog('records')">Records</button>
				</li>
			</ul>
		</nav>
	</header>
	<main class="container">
		<section class="container__start">
			<AppButton
				v-if="gameStore.gameStatus === 'start'"
				title="Start Game"
				@click="gameStore.startGame"
			/>
			<DropdownFilters v-if="gameStore.gameStatus === 'start'" />
		</section>
		<GameBoard v-if="gameStore.gameStatus !== 'start'" />
	</main>

	<DialogWindow :open="isDialogOpen" @close="closeDialog">
		<template v-if="dialogType === 'records'">
			<BestResults />
		</template>
		<template v-else-if="dialogType === 'win'">
			<h2>Good Job!</h2>
			<p>
				You completed the game in {{ gameStore.time }} seconds with
				{{ gameStore.attempts }} attempts.
			</p>
			<AppButton title="Play Again" @click="newGame" />
		</template>
	</DialogWindow>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import TimeCounter from '@/components/TimeCounter.vue';
import AttemptCounter from './components/AttemptCounter.vue';
import BestResults from './components/BestResults.vue';
import GameBoard from '@/components/GameBoard.vue';
import DialogWindow from './components/DialogWindow.vue';
import DropdownFilters from './components/DropdownFilters.vue';

import { useGameStore } from '@/store/gameStore';
import { ref, watch } from 'vue';

const gameStore = useGameStore();

const isDialogOpen = ref(false);
const dialogType = ref('');

const openDialog = (type) => {
	dialogType.value = type;
	isDialogOpen.value = true;
	console.log(type);
};

const closeDialog = () => {
	isDialogOpen.value = false;
	dialogType.value = '';
};

const newGame = () => {
	closeDialog();
	gameStore.startGame();
};

watch(
	() => gameStore.gameStatus,
	(newStatus) => {
		if (newStatus === 'completed') {
			openDialog('win');
		}
	},
);
</script>

<style scoped>
nav {
	width: 100%;
}

nav > .nav__menu {
	list-style-type: none;
	display: flex;
	justify-content: space-between;
}
</style>
