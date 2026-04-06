<script setup>
	useSeoMeta({
		title      : 'Union Consulting Group — Закрытое бизнес-сообщество',
		description: 'Закрытое бизнес-сообщество и консалтинг для предпринимателей. Экосистема для масштабирования личности и бизнеса.',
		keywords   : 'бизнес сообщество, консалтинг, предприниматели, нетворкинг, мастермайнд, Union Consulting Group',
	});
</script>

<template>
	<div class="index-page">
		<SectionsSectionHero />
		<SectionsSectionAbout />
		<SectionsSectionEthics />
		<SectionsSectionLevels />
		<SectionsSectionMembership />
		<SectionsSectionCatalog />
		<SectionsSectionProjects />
		<SectionsSectionFunnel />
		<SectionsSectionSecurity />
		<SectionsSectionApplication />
	</div>
</template>

<style lang='scss'>
.index-page { background: $dark; }
</style>
