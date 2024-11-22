<template>
	<div v-if="gameStore.isLoading" class="loader">
		<div class="spinner"></div>
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();
</script>

<style scoped>
.loader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #121534;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.spinner {
	width: 50px;
	height: 50px;
	border: 5px solid #58ce94;
	border-top-color: #58ce9555;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
