<script setup>
defineProps({
	size: { type: [Number, String], default: 40 },
});
</script>

<template>
	<svg :width="size" :height="size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="20" cy="20" r="16" stroke="currentColor" stroke-width="1.5"/>
		<circle cx="20" cy="20" r="8" stroke="currentColor" stroke-width="1"/>
		<circle cx="20" cy="8" r="3" fill="rgba(201,168,76,0.3)" stroke="currentColor" stroke-width="1"/>
		<circle cx="30" cy="26" r="3" fill="rgba(201,168,76,0.3)" stroke="currentColor" stroke-width="1"/>
		<circle cx="10" cy="26" r="3" fill="rgba(201,168,76,0.3)" stroke="currentColor" stroke-width="1"/>
	</svg>
</template>
