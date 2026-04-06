<script setup>
defineProps({
	size: { type: [Number, String], default: 20 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 20 20" fill="none">
		<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
		<path d="M2 10H18M10 2C8 5 7 7.5 7 10C7 12.5 8 15 10 18M10 2C12 5 13 7.5 13 10C13 12.5 12 15 10 18"
			stroke="currentColor" stroke-width="1.5"/>
	</svg>
</template>
