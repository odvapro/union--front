<script setup>
	const { t } = useI18n();
	const localePath = useLocalePath();
	const { siteName } = usePublicSite();

	const title = computed(() => t('privacyPage.seoTitle'));
	const description = computed(() => t('privacyPage.seoDesc'));

	useSeoMeta({
		title,
		description,
		ogTitle       : title,
		ogDescription : description,
		robots        : 'index, follow',
	});

	const intro = computed(() => t('privacyPage.intro', { site: siteName }));

	const s1Items = computed(() => [0, 1, 2, 3, 4].map((i) => t(`privacyPage.s1.i${i}`)));
	const s2Items = computed(() => [0, 1, 2, 3, 4].map((i) => t(`privacyPage.s2.i${i}`)));
	const s3Items = computed(() => [0, 1, 2].map((i) => t(`privacyPage.s3.i${i}`)));
	const s4Items = computed(() => [0, 1, 2, 3].map((i) => t(`privacyPage.s4.i${i}`)));
	const s5Purposes = computed(() => [0, 1, 2].map((i) => t(`privacyPage.s5Purposes.i${i}`)));
	const s5Types = computed(() => [0, 1, 2].map((i) => t(`privacyPage.s5Types.i${i}`)));
	const s6Items = computed(() => [0, 1, 2, 3].map((i) => t(`privacyPage.s6.i${i}`)));

	const runtimeConfig = useRuntimeConfig();
	const route = useRoute();

	const canonicalUrl = computed(() =>
	{
		const base = String(runtimeConfig.public.siteUrl || '').replace(/\/+$/, '');
		const path = route.path.replace(/\/+$/, '') || '';

		return `${base}${path || '/'}`;
	});

	useHead(() => ({
		link: [
			{ rel: 'canonical', href: canonicalUrl.value },
		],
	}));
</script>

<template>
	<div class="legal-page">
		<div class="container legal-page__inner">
			<NuxtLink class="legal-page__back" :to="localePath('/')">
				<IconsIconArrow class="legal-page__back-icon" :size="16" />
				{{ t('privacyPage.back') }}
			</NuxtLink>

			<h1 class="legal-page__title">{{ t('privacyPage.title') }}</h1>
			<p class="legal-page__intro">{{ intro }}</p>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s1Title') }}</h2>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s1Items" :key="'s1-' + idx">{{ line }}</li>
				</ul>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s2Title') }}</h2>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s2Items" :key="'s2-' + idx">{{ line }}</li>
				</ul>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s3Title') }}</h2>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s3Items" :key="'s3-' + idx">{{ line }}</li>
				</ul>
				<p class="legal-page__p">{{ t('privacyPage.s3Outro') }}</p>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s4Title') }}</h2>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s4Items" :key="'s4-' + idx">{{ line }}</li>
				</ul>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s5Title') }}</h2>
				<p class="legal-page__p">{{ t('privacyPage.s5Intro') }}</p>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s5Purposes" :key="'s5p-' + idx">{{ line }}</li>
				</ul>
				<p class="legal-page__subhead">{{ t('privacyPage.s5TypesTitle') }}</p>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s5Types" :key="'s5t-' + idx">{{ line }}</li>
				</ul>
				<p class="legal-page__p">{{ t('privacyPage.s5Outro') }}</p>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s6Title') }}</h2>
				<p class="legal-page__p">{{ t('privacyPage.s6Intro') }}</p>
				<ul class="legal-page__list">
					<li v-for="(line, idx) in s6Items" :key="'s6-' + idx">{{ line }}</li>
				</ul>
			</section>

			<section class="legal-page__section">
				<h2 class="legal-page__h2">{{ t('privacyPage.s7Title') }}</h2>
				<p class="legal-page__p">{{ t('privacyPage.s7Text') }}</p>
			</section>
		</div>
	</div>
</template>

<style lang="scss">
.legal-page
{
	background: $dark;
	padding: 100px 0 80px;
	min-height: 100vh;
}

.legal-page__inner
{
	max-width: 720px;
}

.legal-page__back
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 28px;
	font-size: 0.875rem;
	font-weight: 600;
	color: $gold;
	text-decoration: none;
	@include transition();

	&:hover
	{
		color: $goldLight;
	}

	.legal-page__back-icon
	{
		transform: rotate(180deg);
	}
}

.legal-page__title
{
	font-size: clamp(1.75rem, 4vw, 2.25rem);
	font-weight: 800;
	letter-spacing: -0.02em;
	color: $textPrimary;
	margin-bottom: 20px;
	line-height: 1.25;
}

.legal-page__intro
{
	font-size: 1rem;
	line-height: 1.7;
	color: $textSecondary;
	margin-bottom: 40px;
}

.legal-page__section
{
	margin-bottom: 36px;

	&:last-child { margin-bottom: 0; }
}

.legal-page__h2
{
	font-size: 1.0625rem;
	font-weight: 700;
	color: $textPrimary;
	margin-bottom: 14px;
	line-height: 1.4;
}

.legal-page__subhead
{
	font-size: 0.9375rem;
	font-weight: 600;
	color: $textPrimary;
	margin: 20px 0 10px;
}

.legal-page__p
{
	font-size: 0.9375rem;
	line-height: 1.65;
	color: $textSecondary;
	margin: 0 0 12px;
}

.legal-page__list
{
	margin: 0;
	padding-left: 1.25rem;
	font-size: 0.9375rem;
	line-height: 1.65;
	color: $textSecondary;

	li { margin-bottom: 10px; }
	li:last-child { margin-bottom: 0; }
}
</style>
