<template>
	<div class="timer">
		<p>Time: {{ formattedTime }}</p>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();

const formattedTime = computed(() => {
	const totalSeconds = gameStore.getTime;
	const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
		2,
		'0',
	);
	const seconds = String(totalSeconds % 60).padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
});
</script>
