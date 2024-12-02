<template>
	<div class="timer">
		<img src="../assets/time-sec.svg" alt="Timer Icon" width="30" />
		<p>{{ formattedTime(gameStore.getTime) }}</p>
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore';
import { useFormattedTime } from '@/composables/useFormattedTime';

const gameStore = useGameStore();

const { formattedTime } = useFormattedTime();
</script>

<style scoped>
.timer {
	display: inline-flex;
	justify-content: space-between;
	line-height: 2;
	gap: 10px;
}
</style>
