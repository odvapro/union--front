<script setup>
	import { gsap } from '~/composables/useGsap';

	const { t } = useI18n();

	const ETHICS_COUNT = 6;

	const values = computed(() =>
	{
		const rows = [];
		for (let i = 0; i < ETHICS_COUNT; i++)
			rows.push({
				title: t(`ethics.values.${i}.title`),
				text: t(`ethics.values.${i}.text`),
			});

		return rows;
	});

	onMounted(() =>
	{
		gsap.fromTo('.ethics__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.ethics__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.ethics__card', { autoAlpha: 0, y: 50, scale: 0.95 }, {
			autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
			scrollTrigger: { trigger: '.ethics__grid', start: 'top 85%', once: true },
		});
	});

</script>

<template>
	<section id="ethics" class="section ethics">
		<div class="container">
			<div class="ethics__header">
				<p class="ethics__label">{{ t('ethics.label') }}</p>
				<h2 class="section__title ethics__title">
					{{ t('ethics.titleLine1') }}<br>{{ t('ethics.titleLine2') }}
				</h2>
				<p class="section__subtitle">
					{{ t('ethics.subtitle') }}
				</p>
			</div>

			<div class="ethics__grid">
				<div
					v-for="(value, i) in values"
					:key="i"
					class="ethics__card gold-border"
				>
					<span class="ethics__card-num">0{{ i + 1 }}</span>
					<h3 class="ethics__card-title">{{ value.title }}</h3>
					<p class="ethics__card-text">{{ value.text }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.ethics
{
	background: linear-gradient(180deg, $dark 0%, rgba(15,32,53,0.6) 100%);
}

.ethics__header
{
	margin-bottom: 64px;
	text-align: center;
}

.ethics__label
{
	display: inline-block;
	margin-bottom: 16px;
	font-size: 0.8125rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
}

.ethics__title { text-align: center; }

.ethics__grid
{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;

	@include mq(768, 1024) { grid-template-columns: repeat(2, 1fr); }
	@include mq(0, 768) { grid-template-columns: 1fr; }
}

.ethics__card
{
	padding: 32px;
	background: $darkCard;
	@include transition();

	&:hover
	{
		border-color: rgba(201,168,76,0.5);
		transform: translateY(-2px);
	}
}

.ethics__card-num
{
	display: block;
	margin-bottom: 16px;
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: $gold;
	opacity: 0.6;
}

.ethics__card-title
{
	margin-bottom: 10px;
	font-size: 1.125rem;
	font-weight: 700;
	color: $textPrimary;
}

.ethics__card-text
{
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}
</style>
