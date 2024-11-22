<template>
	<h1>Records:</h1>
	<div class="records">
		<div class="records__time">
			<h2>Top 3 Best Time Results:</h2>
			<ol>
				<li v-for="(result, index) in bestTime" :key="index">
					{{ formattedTime(result.time) }}
				</li>
			</ol>
		</div>
		<div class="records__attempts">
			<h2>Top 3 Best Attempt Results:</h2>
			<ol>
				<li v-for="(result, index) in bestAttempts" :key="index">
					{{ result.attempts }}
				</li>
			</ol>
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

<style scoped>
h1,
h2 {
	font-family: 'Squada One', sans-serif;
	color: #fcfcfc;
}

h1 {
	text-align: center;
	font-size: 48px;
}

.records ol {
	margin-left: 20px;
}

.records ol li::marker {
	font-family: 'Squada One', sans-serif;
	color: #fcfcfc;
	font-size: 20px;
}

.records ol li {
	font-family: 'Squada One', sans-serif;
	color: #58ce94;
	font-size: 18px;
}
</style>
