<template>
	<div class="filters">
		<div class="filters__dropdown">
			<label for="theme">Choose Theme:</label>
			<select
				name="theme"
				id="theme"
				v-model="selectedTheme"
				@change="updateTheme"
			>
				<option value="farm">Farm</option>
				<option value="space">Space</option>
				<option value="wildlife">Wildlife</option>
			</select>
		</div>
		<div class="filters__dropdown">
			<label for="grid">Choose Grid Size:</label>
			<select name="grid" id="grid" v-model="selectedGrid" @change="updateGrid">
				<option value="4">4x4</option>
				<option value="6">6x6</option>
				<option value="8">8x8</option>
			</select>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '@/store/gameStore';

const gameStore = useGameStore();

const selectedTheme = ref(gameStore.theme);
const selectedGrid = ref(gameStore.grid);

// Update theme in the store
const updateTheme = () => {
	gameStore.setTheme(selectedTheme.value);
};

// Update grid in the store
const updateGrid = () => {
	gameStore.setGridSize(parseInt(selectedGrid.value));
};
</script>

<style scoped>
.filters {
	width: 33.3%;
	margin: 30px auto;
}

.filters__dropdown {
	margin: 15px 0;
}

.filters__dropdown label {
	display: block;
	font-family: 'Open Sans', sans-serif;
	font-weight: 300;
	font-size: 14px;
	color: #b7b8be;
	text-align: center;
	margin-bottom: 5px;
}

.filters__dropdown select {
	width: 100%;
	padding: 10px;
	background-color: #22284a;
	border: none;
	border-radius: 3px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 300;
	font-size: 14px;
	color: #666a83;
}

@media (max-width: 1200px) {
	.filters {
		width: 50%;
	}
}

@media (max-width: 768px) {
	.filters {
		width: 75%;
	}
}
</style>
