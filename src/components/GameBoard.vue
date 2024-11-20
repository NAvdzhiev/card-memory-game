<template>
	<div class="game-board">
		<SingleCard
			v-for="card in cards"
			:id="card.id"
			:cardImage="card.image"
			:cardAltTxt="card.text"
			:key="card.id"
		/>
	</div>
</template>

<script setup>
import SingleCard from './SingleCard.vue';
const cards = [
	{ id: 1, image: 'image1.jpg', text: 'Image 1' },
	{ id: 2, image: 'image2.jpg', text: 'Image 2' },
	{ id: 3, image: 'image3.jpg', text: 'Image 3' },
	{ id: 4, image: 'image4.jpg', text: 'Image 4' },
	{ id: 1, image: 'image1.jpg', text: 'Image 5' },
	{ id: 2, image: 'image2.jpg', text: 'Image 6' },
	{ id: 3, image: 'image3.jpg', text: 'Image 7' },
	{ id: 4, image: 'image4.jpg', text: 'Image 8' },
];
</script>

<style scoped>
.game-board {
	display: flex;
	justify-content: space-between;
}
</style>
