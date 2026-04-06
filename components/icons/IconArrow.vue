<script setup>
defineProps({
	size: { type: [Number, String], default: 16 },
});
</script>

<template>
	<svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" fill="none">
		<path
			v-if="size <= 16"
			d="M3 8H13M13 8L9 4M13 8L9 12"
			stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
		/>
		<path
			v-else
			d="M4 10H16M16 10L11 5M16 10L11 15"
			stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
		/>
	</svg>
</template>
