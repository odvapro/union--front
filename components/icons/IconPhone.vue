<script setup>
defineProps({
	size: { type: [Number, String], default: 20 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 20 20" fill="none">
		<path d="M4 3H7L8.5 7L7 8.5C7.8 10.2 9.8 12.2 11.5 13L13 11.5L17 13V16C17 17.1 16.1 18 15 18C8.4 18 2 11.6 2 5C2 3.9 2.9 3 4 3Z"
			stroke="currentColor" stroke-width="1.5" fill="none"/>
	</svg>
</template>
