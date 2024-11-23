<template>
	<div
		class="card"
		:class="{ flipped: flipped || isMatched }"
		@click="flipCard"
	>
		<div class="card__front">
			<img :src="cardImage" :alt="cardAltTxt" />
		</div>
		<div :class="`card__back ${gameStore.theme}`"></div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const props = defineProps({
	cardImage: String,
	cardAltTxt: String,
	id: Number,
});

const gameStore = useGameStore();

const flipped = computed(() => gameStore.flippedCards.includes(props.id));
const isMatched = computed(() =>
	gameStore.matchedCards.some((matchedCard) => matchedCard.id === props.id),
);

const flipCard = () => {
	if (flipped.value || isMatched.value || gameStore.blockInteraction) return;
	gameStore.flipCard(props.id);

	console.log(gameStore.matchedCards);
};
</script>

<style scoped>
.card {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: transform 0.5s;
	border-radius: 25px;
	overflow: hidden;
	position: relative;
	perspective: 1000px;
	box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.35);
}

.card__front,
.card__back {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	backface-visibility: hidden;
	transform-style: preserve-3d;
	transition: transform 0.2s ease;
}

.card__front {
	background-color: #fcfcfc;
	transform: rotateY(180deg);
}

.card__back {
	transform: rotateY(0deg);
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
}

.card.flipped .card__front {
	transform: rotateY(0deg);
}

.card.flipped .card__back {
	transform: rotateY(-180deg);
}

.card__back.farm {
	background-image: url('../assets/backgrounds/card-farm.jpg');
}

.card__back.space {
	background-image: url('../assets/backgrounds/card-space.jpg');
}

.card__back.wildlife {
	background-image: url('../assets/backgrounds/card-wildlife.jpg');
}

img {
	width: 50%;
}

/* Responsive styles */

@media (max-width: 768px) {
	.card {
		border-radius: 15px;
	}

	img {
		width: 65%;
	}
}

@media (max-width: 480px) {
	.card {
		border-radius: 8px;
	}
}
</style>
