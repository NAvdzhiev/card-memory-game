<template>
	<div :class="`game__page ${gameStore.theme}`">
		<header class="header">
			<nav class="nav">
				<ul class="nav__menu">
					<li class="nav__menu-item counters">
						<TimeCounter />
						<AttemptCounter />
					</li>
					<li class="nav__menu-item">
						<AppButton
							:style="{ marginTop: '0', boxShadow: 'none' }"
							title="Restart"
							@click="newGame"
							><img
								class="menu-item__records"
								src="../assets/undo.svg"
								alt="Undo Icon"
								width="20"
							/>
						</AppButton>
						<img
							@click="openDialog('records')"
							src="../assets/rewards.svg"
							alt="Records Icon"
							width="50"
							:style="{ cursor: 'pointer' }"
						/>
					</li>
				</ul>
			</nav>
		</header>
		<section class="container__board">
			<GameBoard />
		</section>
		<DialogWindow :open="isDialogOpen" @close="closeDialog">
			<template v-if="dialogType === 'records'">
				<BestResults />
			</template>
			<template v-else-if="dialogType === 'win'">
				<div>
					<h2>Good Job!</h2>
					<p>
						Your time: {{ gameStore.time }} <br />
						You did {{ gameStore.attempts }} attempts.
					</p>
					<AppButton title="Play Again" @click="newGame" />
				</div>
			</template>
		</DialogWindow>
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
import { ref, watch, onMounted, onUnmounted } from 'vue';

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

const handleKeyPress = (event) => {
	if (event.code === 'Space') {
		event.preventDefault();
		if (gameStore.gameStatus === 'in progress') {
			gameStore.pauseGame();
		} else {
			gameStore.resetGame();
		}
	}
};

onMounted(() => {
	window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyPress);
});

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
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.nav__menu > .nav__menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 30px;
}

.nav__menu-item.counters {
	background: #1b2141;
	padding: 20px 30px;
	font-family: 'Squada One', sans-serif;
	color: #fff;
	border-radius: 50px;
}

img.menu-item__records {
	display: inline-block;
}

@media (max-width: 1200px) {
	.game__page {
		justify-content: space-evenly;
	}

	.nav > .nav__menu {
		flex-direction: column-reverse;
		justify-content: space-around;
	}

	.nav > .nav__menu > .nav__menu-item {
		margin: 20px 0;
	}
}
</style>
