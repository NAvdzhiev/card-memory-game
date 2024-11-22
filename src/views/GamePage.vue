<template>
	<div :class="`game__page ${gameStore.theme}`">
		<header class="header">
			<nav class="nav">
				<ul class="nav__menu">
					<li class="nav__menu-item">
						<AppButton title="Restart Game" @click="newGame" />
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
		<section class="container__board">
			<div v-if="gameStore.gameStatus === 'in progress'">
				<button @click="gameStore.pauseGame">&#x23F8;</button>
			</div>
			<div v-else-if="gameStore.gameStatus === 'paused'">
				<button @click="gameStore.resetGame">&#x23F5;</button>
			</div>
			<GameBoard />
		</section>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import TimeCounter from '@/components/TimeCounter.vue';
import AttemptCounter from '@/components/AttemptCounter.vue';
import BestResults from '@/components/BestResults.vue';
import GameBoard from '@/components/GameBoard.vue';
import DialogWindow from '@/components/DialogWindow.vue';

import { useGameStore } from '@/store/gameStore';
import { ref, watch, computed } from 'vue';

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

// const backgroundStyle = computed(() => ({
// 	backgroundImage: `url(${require(`./assets/backgrounds/${gameStore.theme}.jpg`)})`,
// 	transition: 'background-image 0.5s ease-in-out', // Transition for smooth change
// }));
</script>

<style scoped>
.game__page {
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.game__page.space {
	background-image: url('../assets/backgrounds/space.jpg');
}

.game__page.farm {
	background-image: url('../assets/backgrounds/farm.jpg');
}

.game__page.wildlife {
	background-image: url('../assets/backgrounds/wildlife.jpg');
}

header {
	width: 100%;
	padding: 0 24px;
}

.nav > .nav__menu {
	list-style-type: none;
	display: flex;
	justify-content: space-between;
	width: 100%;
}
</style>
