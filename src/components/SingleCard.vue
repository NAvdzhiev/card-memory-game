<template>
	<div class="card" @click="flipCard">
		<div v-if="flipped" class="card__front">
			<img :src="cardImage" :alt="cardAltTxt" />
		</div>
		<div v-else class="card__back"></div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	cardImage: String,
	cardAltTxt: String,
	id: Number,
});

const emit = defineEmits(['flip']);

const flipped = ref(false);

const flipCard = () => {
	flipped.value = !flipped.value;
	emit('flip', { id: props.id, flipped: flipped.value });
};
</script>

<style scoped>
.card {
	width: 150px;
	height: 200px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: transform 0.5s;
	border-radius: 15px;
	overflow: hidden;
	border: 1px solid;
	box-shadow: 0 0 15px #b3b3b3;
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
	background-color: #fff;
}

.card__back {
	background-color: red;
}
</style>
