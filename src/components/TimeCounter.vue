<template>
	<div class="timer">
		<p>{{ formattedTime(gameStore.getTime) }}</p>
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore';
import { useFormattedTime } from '@/composables/useFormattedTime';

const gameStore = useGameStore();
const { formattedTime } = useFormattedTime();

// Format timer as a clock
</script>
