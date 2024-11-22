<template>
	<div class="intro__page">
		<section class="intro__section">
			<img class="intro__logo" :src="require('@/assets/logo.jpg')" alt="" />
			<DropdownFilters />
			<AppButton class="intro__btn" title="Start!" @click="handleClick" />
		</section>
	</div>
</template>

<script setup>
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
	min-height: 100vh;
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
	padding-bottom: 60px;
}

.intro__logo {
	width: 70%;
	margin: auto;
	border-bottom: 1px solid #2a2f4d;
}

.intro__btn {
	width: 33.3%;
}

@media (max-width: 1200px) {
	.intro__section {
		width: 50%;
	}

	.intro__btn {
		width: 50%;
	}
}

@media (max-width: 768px) {
	.intro__section {
		width: 80%;
	}

	.intro__btn {
		width: 75%;
	}
}
</style>
