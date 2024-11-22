<template>
	<router-view />
</template>

<script setup></script>

<style scoped>
.game-app {
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	min-height: 100%;
	height: 100vh;
}

nav {
	width: 100%;
}

nav > .nav__menu {
	list-style-type: none;
	display: flex;
	justify-content: space-between;
}
</style>
