<script setup>
defineProps({
	width: { type: [Number, String], default: 32 },
	height: { type: [Number, String], default: 32 },
});
</script>

<template>
	<svg :width="width" :height="height" viewBox="0 0 32 32" fill="none">
		<path d="M16 2L28 8V18C28 24.6 22.6 30 16 32C9.4 30 4 24.6 4 18V8L16 2Z"
			fill="rgba(201,168,76,0.1)" stroke="#c9a84c" stroke-width="1.2"/>
		<path d="M16 8L22 11V17C22 20.3 19.3 23 16 24C12.7 23 10 20.3 10 17V11L16 8Z"
			fill="rgba(201,168,76,0.15)" stroke="#c9a84c" stroke-width="1"/>
	</svg>
</template>
