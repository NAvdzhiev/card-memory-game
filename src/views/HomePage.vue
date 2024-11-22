<template>
	<div class="intro__page">
		<section class="intro__section">
			<img class="intro__logo" :src="require('@/assets/logo.jpg')" alt="" />
			<DropdownFilters />
			<AppButton title="Start!" @click="handleClick" />
		</section>
	</div>
</template>

<script setup>
import DialogWindow from '@/components/DialogWindow.vue';
import AppButton from '@/components/AppButton.vue';
import DropdownFilters from '@/components/DropdownFilters.vue';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const router = useRouter();

const handleClick = () => {
	gameStore.startGame();
	router.replace('/game');
};
</script>

<style scoped>
.intro__page {
	background-image: url('../assets/backgrounds/home.jpg');
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.intro__section {
	background-color: #1b2141;
	border-top: 5px solid #58ce94;
	height: 75%;
	width: 40%;
	text-align: center;
	box-shadow: 15px 5px 15px 0px rgba(0, 0, 0, 0.3);
}

.intro__logo {
	width: 80%;
	margin: auto;
	border-bottom: 1px solid #2a2f4d;
}

button {
	font-family: 'Squada One', sans-serif;
	font-weight: 900;
	font-size: 20px;
	text-transform: uppercase;
	color: #fff;
	padding: 10px 20px;
	width: 33.3%;
	border: none;
	border-radius: 50px;
	background-color: #ea4186;
	margin-top: 15px;
	box-shadow: 12px 3px 10px 0px rgba(0, 0, 0, 0.25);
}

button:hover {
	animation: pulse 2s infinite;
	cursor: pointer;
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
</style>
