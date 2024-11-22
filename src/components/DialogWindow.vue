<template>
	<dialog v-show="open" @click.self="close">
		<slot></slot>
	</dialog>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['close']);

const close = () => {
	emit('close');
};

watch(
	() => props.open,
	(newValue) => {
		if (newValue) {
			document.querySelector('dialog').showModal();
		} else {
			document.querySelector('dialog').close();
		}
	},
);
</script>

<style scoped>
dialog {
	border: none;
	border-radius: 25px;
	box-shadow: 15px 5px 15px 0px rgba(0, 0, 0, 0.3);
	margin: auto;
	padding: 0;
	width: 75%;
	max-width: 100%;
	background: #1b2141;
	padding: 50px;
}

.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	background: transparent;
	border: none;
	font-size: 24px;
	cursor: pointer;
}

dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
