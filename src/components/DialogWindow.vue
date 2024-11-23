<template>
	<dialog v-show="open" @click.self="close">
		<button class="close-btn" @click="close">
			<img src="../assets/close.svg" alt="Close Button" />
		</button>
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
	border-top: 5px solid #58ce94;
	border-radius: 0;
	box-shadow: 15px 5px 15px 0px rgba(0, 0, 0, 0.3);
	margin: auto;
	padding: 10px;
	width: 33.3%;
	max-width: 100%;
	background: #1b2141;
	padding: 30px;
	color: #fff;
	font-family: 'Squada One', sans-serif;
}

dialog .close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 15px;
	border: none;
	background: transparent;
	cursor: pointer;
}

dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 1200px) {
	dialog {
		width: 50%;
	}
}

@media (max-width: 768px) {
	dialog {
		width: 75%;
	}
}
</style>
