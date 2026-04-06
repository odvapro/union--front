<script setup>
defineProps({
	size: { type: [Number, String], default: 48 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="1.5"/>
		<path d="M6 18H42" stroke="currentColor" stroke-width="1.5"/>
		<path d="M18 8V18" stroke="currentColor" stroke-width="1.5"/>
		<circle cx="33" cy="33" r="6" fill="rgba(201,168,76,0.1)" stroke="currentColor" stroke-width="1.5"/>
		<path d="M30 33L32 35L36 31" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
	</svg>
</template>
