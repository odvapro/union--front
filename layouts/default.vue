<template>
	<div class="default-layout">
		<Header />
		<main class="default-layout__main">
			<slot />
		</main>
		<Footer />
	</div>

	<Teleport to="body">
		<UiConfirmDialog />
	</Teleport>
</template>

<style lang="scss">
.default-layout__main { min-height: 100vh; }
</style>
