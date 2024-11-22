<template>
	<button @click="handleClick">
		<span><slot></slot> {{ title }}</span>
	</button>
</template>

<script setup>
defineProps({
	title: { type: String, required: true, default: 'Start Game' },
});

const emit = defineEmits(['click']);

const handleClick = () => {
	emit('click'); // Emit the click event when button is clicked
};
</script>

<style scoped>
button {
	font-family: 'Squada One', sans-serif;
	font-weight: 900;
	font-size: 20px;
	text-transform: uppercase;
	color: #fff;
	padding: 10px 20px;
	width: 100%;
	border: none;
	border-radius: 50px;
	background-color: #ea4186;
	margin-top: 15px;
	box-shadow: 12px 3px 10px 0px rgba(0, 0, 0, 0.25);
}

button:hover {
	animation: pulse 2s infinite;
	cursor: pointer;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}
</style>
