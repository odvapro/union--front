<script setup>
	import { gsap, ScrollTrigger } from '~/composables/useGsap';

	const { t } = useI18n();

	onMounted(() =>
	{
		gsap.fromTo('.about__header', { autoAlpha: 0, y: 50 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.about__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.about__pillar', { autoAlpha: 0, y: 60 }, {
			autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
			scrollTrigger: { trigger: '.about__pillars', start: 'top 85%', once: true },
		});
	});
</script>

<template>
	<section id="about" class="section about">
		<div class="container">
			<div class="about__header">
				<h2 class="section__title">
					{{ t('about.titleBefore') }}<br>
					<span class="gold-text">{{ t('about.titleGold') }}</span> {{ t('about.titleAfter') }}
				</h2>
				<p class="section__subtitle about__lead">
					{{ t('about.lead') }}
				</p>
			</div>

			<div class="about__pillars">
				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<IconsIconBusiness class="g-icon-accent" />
					</div>
					<h3 class="about__pillar-title">{{ t('about.p1Title') }}</h3>
					<p class="about__pillar-text">
						{{ t('about.p1Text') }}
					</p>
					<ul class="about__pillar-list">
						<li>{{ t('about.p1i1') }}</li>
						<li>{{ t('about.p1i2') }}</li>
						<li>{{ t('about.p1i3') }}</li>
					</ul>
				</div>

				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<IconsIconNetwork class="g-icon-accent" />
					</div>
					<h3 class="about__pillar-title">{{ t('about.p2Title') }}</h3>
					<p class="about__pillar-text">
						{{ t('about.p2Text') }}
					</p>
					<ul class="about__pillar-list">
						<li>{{ t('about.p2i1') }}</li>
						<li>{{ t('about.p2i2') }}</li>
						<li>{{ t('about.p2i3') }}</li>
					</ul>
				</div>

				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<IconsIconEducation class="g-icon-accent" />
					</div>
					<h3 class="about__pillar-title">{{ t('about.p3Title') }}</h3>
					<p class="about__pillar-text">
						{{ t('about.p3Text') }}
					</p>
					<ul class="about__pillar-list">
						<li>{{ t('about.p3i1') }}</li>
						<li>{{ t('about.p3i2') }}</li>
						<li>{{ t('about.p3i3') }}</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.about__header
{
	margin-bottom: 64px;
	max-width: 640px;
}

.about__lead
{
	margin-top: 12px;
	font-size: 1.25rem;
}

.about__pillars
{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;

	@include mq(0, 900) { grid-template-columns: 1fr; }
}

.about__pillar
{
	padding: 36px 32px;
	background: $darkCard;
	@include transition();

	&:hover { border-color: rgba(var(--rgb-accent), 0.5); }
}

.about__pillar-icon { margin-bottom: 24px; }

.about__pillar-title
{
	margin-bottom: 12px;
	font-size: 1.25rem;
	font-weight: 700;
	color: $gold;
}

.about__pillar-text
{
	margin-bottom: 20px;
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}

.about__pillar-list
{
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;

	li
	{
		padding-left: 16px;
		position: relative;
		font-size: 0.875rem;
		color: $textSecondary;

		&::before
		{
			content: '';
			position: absolute;
			left: 0;
			top: 8px;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background: $gold;
		}
	}
}
</style>
