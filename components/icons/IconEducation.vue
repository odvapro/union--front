<script setup>
defineProps({
	size: { type: [Number, String], default: 40 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="6" y="8" width="28" height="24" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
		<line x1="6" y1="16" x2="34" y2="16" stroke="currentColor" stroke-width="1"/>
		<line x1="14" y1="8" x2="14" y2="32" stroke="currentColor" stroke-width="1"/>
		<path d="M19 22L22 25L28 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
	</svg>
</template>
