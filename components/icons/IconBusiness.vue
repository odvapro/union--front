<script setup>
defineProps({
	size: { type: [Number, String], default: 40 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
		<path d="M20 12L28 16V24L20 28L12 24V16L20 12Z" fill="rgba(var(--rgb-accent), 0.15)" stroke="currentColor" stroke-width="1"/>
	</svg>
</template>
