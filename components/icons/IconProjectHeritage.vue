<script setup>
defineProps({
	size: { type: [Number, String], default: 48 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="currentColor" stroke-width="1.5"/>
		<path d="M24 14L34 19V29L24 34L14 29V19L24 14Z" fill="rgba(var(--rgb-accent), 0.1)" stroke="currentColor" stroke-width="1"/>
		<circle cx="24" cy="24" r="3" fill="currentColor"/>
	</svg>
</template>
