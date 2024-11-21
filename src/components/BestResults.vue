<template>
	<h1>Records:</h1>
	<div class="records">
		<div class="records__time">
			<h2>Top 3 Best Time Results:</h2>
			<ul>
				<li v-for="(result, index) in bestTime" :key="index">
					{{ formattedTime(result.time) }}
				</li>
			</ul>
		</div>
		<div class="records__attempts">
			<h2>Top 3 Best Attempt Results:</h2>
			<ul>
				<li v-for="(result, index) in bestAttempts" :key="index">
					{{ result.attempts }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore';
import { useFormattedTime } from '@/composables/useFormattedTime';

const gameStore = useGameStore();
const { formattedTime } = useFormattedTime();

const bestAttempts = gameStore.getBestAttempts;
const bestTime = gameStore.getBestTime;
</script>
