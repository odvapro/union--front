<script setup>
defineProps({
	size: { type: [Number, String], default: 28 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 28 28" fill="none">
		<rect x="5" y="12" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
		<path d="M9 12V9C9 6.8 11.2 5 14 5C16.8 5 19 6.8 19 9V12"
			stroke="currentColor" stroke-width="1.5" fill="none"/>
		<circle cx="14" cy="18" r="2" fill="currentColor"/>
	</svg>
</template>
