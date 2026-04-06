<script setup>
defineProps({
	size: { type: [Number, String], default: 28 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 28 28" fill="none">
		<path d="M14 3L23 7V14C23 19 18.5 23.4 14 25C9.5 23.4 5 19 5 14V7L14 3Z"
			stroke="currentColor" stroke-width="1.5" fill="none"/>
		<path d="M9 14L12 17L19 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
	</svg>
</template>
