<template>
	<div class="card" @click="flipCard">
		<div v-if="flipped || isMatched" class="card__front">
			<img :src="cardImage" :alt="cardAltTxt" />
		</div>
		<div v-else :class="`card__back ${gameStore.theme}`"></div>
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
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: transform 0.5s;
	border-radius: 25px;
	overflow: hidden;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.35);
}

.card__front,
.card__back {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.card__front {
	background-color: #fcfcfc;
}

.card__back {
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
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
