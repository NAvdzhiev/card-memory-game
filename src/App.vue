<template>
	<header>
		<AppButton title="Start Game" @click="gameStore.startGame" />
		<TimeCounter />
	</header>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
import TimeCounter from '@/components/TimeCounter.vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();
</script>
