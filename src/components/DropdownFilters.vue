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
				<option value="classic">Classic</option>
				<option value="space">Space</option>
				<option value="nature">Nature</option>
				<option value="farm">Farm</option>
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
