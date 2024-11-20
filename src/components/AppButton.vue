<template>
	<button @click="handleClick">
		{{ title }}
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
