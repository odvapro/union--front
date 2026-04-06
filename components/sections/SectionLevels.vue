<script setup>
	import { gsap } from '~/composables/useGsap';
	import levelsRu from '~/data/levels.ru.json';
	import levelsEn from '~/data/levels.en.json';

	const { t, locale } = useI18n();

	const levels = computed(() => (locale.value === 'en' ? levelsEn : levelsRu));

	onMounted(() =>
	{
		gsap.fromTo('.levels__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.levels__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.levels__step', { autoAlpha: 0, x: -40 }, {
			autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
			scrollTrigger: { trigger: '.levels__pyramid', start: 'top 85%', once: true },
		});

		gsap.fromTo('.levels__detail', { autoAlpha: 0, y: 30 }, {
			autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
			scrollTrigger: { trigger: '.levels__detail', start: 'top 90%', once: true },
		});
	});

	const activeLevel = ref(2);
</script>

<template>
	<section id="levels" class="section levels">
		<div class="container">
			<div class="levels__header">
				<p class="levels__label">{{ t('levels.label') }}</p>
				<h2 class="section__title">
					{{ t('levels.titleLine') }} <span class="gold-text">{{ t('levels.titleBrand') }}</span>
				</h2>
				<p class="section__subtitle">
					{{ t('levels.subtitle') }}
				</p>
			</div>

			<div class="levels__pyramid">
				<div
					v-for="(level, i) in [...levels].reverse()"
					:key="level.name"
					class="levels__step"
					:class="{ 'levels__step--active': activeLevel === (levels.length - 1 - i) }"
					:style="{ '--w': level.width + '%' }"
					@click="activeLevel = levels.length - 1 - i"
				>
					<div class="levels__step-bar">
						<span class="levels__step-name">{{ level.name }}</span>
						<span v-if="level.lock" class="levels__step-lock">🔒</span>
						<span class="levels__step-desc">{{ level.desc }}</span>
					</div>
				</div>
			</div>

			<div v-if="activeLevel !== null" class="levels__detail gold-border">
				<div class="levels__detail-left">
					<h3 class="levels__detail-name">{{ levels[activeLevel].name }}</h3>
					<p class="levels__detail-desc">{{ levels[activeLevel].desc }}</p>
					<p class="levels__detail-text">{{ levels[activeLevel].detail }}</p>
				</div>
				<div v-if="levels[activeLevel].price" class="levels__detail-price">
					<span class="levels__price-label">{{ t('levels.priceLabel') }}</span>
					<span class="levels__price-value">{{ levels[activeLevel].price }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.levels__header
{
	margin-bottom: 64px;
}

.levels__label
{
	display: inline-block;
	margin-bottom: 16px;
	font-size: 0.8125rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
}

.levels__pyramid
{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	margin-bottom: 40px;
}

.levels__step
{
	width: var(--w);
	cursor: pointer;
	@include transition();

	&:hover .levels__step-bar { border-color: rgba(201,168,76,0.6); }

	&--active .levels__step-bar
	{
		background: rgba(201,168,76,0.12);
		border-color: $gold;
	}
}

.levels__step-bar
{
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	padding: 14px 24px;
	background: $darkCard;
	border: 1px solid $darkBorder;
	border-radius: 6px;
	@include transition();

	@include mq(0, 600) { flex-direction: column; gap: 4px; }
}

.levels__step-name
{
	font-size: 1rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	color: $gold;
	flex-shrink: 0;
}

.levels__step-lock { font-size: 0.875rem; }

.levels__step-desc
{
	font-size: 0.875rem;
	color: $textSecondary;

	@include mq(0, 600) { text-align: center; }
}

.levels__detail
{
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 32px;
	padding: 40px;
	background: $darkCard;

	@include mq(0, 768) { flex-direction: column; }
}

.levels__detail-left { flex: 1; }

.levels__detail-name
{
	margin-bottom: 6px;
	font-size: 1.5rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	color: $gold;
}

.levels__detail-desc
{
	margin-bottom: 16px;
	font-size: 0.9375rem;
	font-weight: 500;
	color: $textPrimary;
}

.levels__detail-text
{
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}

.levels__detail-price
{
	display: flex;
	flex-direction: column;
	gap: 6px;
	flex-shrink: 0;
	text-align: right;

	@include mq(0, 768) { text-align: left; }
}

.levels__price-label
{
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $textSecondary;
}

.levels__price-value
{
	font-size: 1rem;
	font-weight: 700;
	color: $gold;
}
</style>
