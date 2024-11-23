<template>
	<div
		:class="`game__page ${gameStore.theme}`"
		:style="
			gameStore.gameStatus === 'paused'
				? { filter: 'grayscale(80%)' }
				: { filter: 'none' }
		"
	>
		<header class="header">
			<nav class="nav">
				<ul class="nav__menu">
					<li class="nav__menu-item counters">
						<TimeCounter />
						<AttemptCounter />
					</li>
					<li class="nav__menu-item text">
						<h2>Press Space to Pause/Play Game</h2>
					</li>
					<li class="nav__menu-item actions">
						<AppButton
							:disabled="gameStore.gameStatus !== 'in progress'"
							:style="{ marginTop: '0', boxShadow: 'none' }"
							title="Restart"
							@click="newGame"
							><img
								class="menu-item__records"
								src="../assets/undo.svg"
								alt="Undo Icon"
								width="20"
								:style="{ marginBottom: '-3px' }"
							/>
						</AppButton>
						<img
							@click="openDialog('records')"
							src="../assets/rewards.svg"
							alt="Records Icon"
							width="50"
							class="menu-item__records"
						/>
					</li>
				</ul>
			</nav>
		</header>
		<section class="container__board">
			<GameBoard />
		</section>
		<button class="game__back-button" @click="handleBackButton">
			<img src="../assets/arrow.svg" alt="Back Arrow" />
		</button>
		<DialogWindow :open="isDialogOpen" @close="closeDialog">
			<template v-if="dialogType === 'records'">
				<BestResults />
			</template>
			<template v-else-if="dialogType === 'win'">
				<div class="game__win-dialog">
					<h1>Good Job!</h1>
					<p>
						Your time:
						<span :style="{ color: '#58ce94' }">{{
							formattedTime(gameStore.time)
						}}</span>
						<br />
						You did
						<span :style="{ color: '#58ce94' }">{{ gameStore.attempts }}</span>
						attempts.
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
import { useRouter } from 'vue-router';
import { useFormattedTime } from '@/composables/useFormattedTime';
import { ref, watch, onMounted, onUnmounted } from 'vue';

const gameStore = useGameStore();
const router = useRouter();
const { formattedTime } = useFormattedTime();

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

const handleBackButton = () => {
	router.replace('/');
	gameStore.gameStatus === 'start';
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
	order: 0;
	background: #1b2141;
	padding: 20px 30px;
	font-family: 'Squada One', sans-serif;
	color: #fff;
	border-radius: 50px;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.35);
}

.nav__menu-item.actions {
	order: 2;
}

img.menu-item__records {
	display: inline-block;
	cursor: pointer;
}

.nav__menu-item.text {
	order: 1;
}

.nav__menu-item.text > h2 {
	font-family: 'Squada One', sans-serif;
	text-transform: uppercase;
	color: #fbf2f2;
	text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.35);
	text-align: center;
}

.game__back-button {
	width: 80px;
	height: 80px;
	background: #fcfcfc;
	position: absolute;
	bottom: 20px;
	left: 20px;
	border: none;
	border-radius: 50px;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.35);
	display: flex;
	justify-content: space-around;
}

.game__back-button > img {
	width: 30px;
}

.game__back-button:hover {
	animation: pulse 2s infinite;
	cursor: pointer;
}

.game__win-dialog {
	text-align: center;
}

.game__win-dialog h1 {
	padding: 18px;
}

.game__win-dialog p {
	font-size: 18px;
	padding: 20px 0;
}

.game__win-dialog > button {
	width: 33.3%;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
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

	.nav__menu-item.actions {
		order: 2;
	}

	.nav__menu-item.counters {
		order: 1;
	}

	.nav__menu-item.text {
		order: 0;
	}

	.game__win-dialog > button {
		width: 50%;
	}
}

@media (max-width: 600px) {
	.game__back-button {
		width: 55px;
		height: 55px;
	}

	.game__back-button > img {
		width: 25px;
	}

	.game__win-dialog > button {
		width: 80%;
	}
}
</style>
