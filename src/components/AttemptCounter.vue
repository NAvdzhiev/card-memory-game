<template>
	<p>Attempts: {{ attemptsCount }}</p>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();

const attemptsCount = computed(() => gameStore.attempts);
</script>
