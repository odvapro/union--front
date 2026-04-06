<script setup>
	import { gsap } from '~/composables/useGsap';
	import funnelRu from '~/data/funnel-steps.ru.json';
	import funnelEn from '~/data/funnel-steps.en.json';

	const { t, locale } = useI18n();

	const steps = computed(() => (locale.value === 'en' ? funnelEn : funnelRu));

	onMounted(() =>
	{
		gsap.fromTo('.funnel__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.funnel__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.funnel__step', { autoAlpha: 0, x: -30 }, {
			autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
			scrollTrigger: { trigger: '.funnel__steps', start: 'top 85%', once: true },
		});
	});

</script>

<template>
	<section id="funnel" class="section funnel">
		<div class="container">
			<div class="funnel__header">
				<h2 class="section__title">
					<span class="gold-text">{{ t('funnel.titleGold') }}</span>{{ t('funnel.titleRest') }}
				</h2>
				<p class="section__subtitle">
					{{ t('funnel.subtitle') }}
				</p>
			</div>

			<div class="funnel__steps">
				<div
					v-for="(step, i) in steps"
					:key="step.num"
					class="funnel__step"
				>
					<div class="funnel__step-left">
						<div class="funnel__step-num">{{ step.num }}</div>
						<div v-if="i < steps.length - 1" class="funnel__step-line" />
					</div>
					<div class="funnel__step-content">
						<h3 class="funnel__step-title">{{ step.title }}</h3>
						<p class="funnel__step-desc">{{ step.desc }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.funnel
{
	background: linear-gradient(180deg, rgba(15,32,53,0.4) 0%, $dark 100%);
}

.funnel__header { margin-bottom: 56px; }

.funnel__steps
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0 48px;

	@include mq(0, 768) { grid-template-columns: 1fr; }
}

.funnel__step
{
	display: flex;
	gap: 20px;
	padding-bottom: 32px;
}

.funnel__step-left
{
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-shrink: 0;
}

.funnel__step-num
{
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid $gold;
	border-radius: 50%;
	font-size: 0.8125rem;
	font-weight: 800;
	color: $gold;
	flex-shrink: 0;
	background: rgba(201,168,76,0.06);
}

.funnel__step-line
{
	flex: 1;
	width: 1px;
	background: $darkBorder;
	margin-top: 8px;
	min-height: 20px;

	@include mq(0, 768) { display: none; }
}

.funnel__step-content { padding-top: 10px; }

.funnel__step-title
{
	margin-bottom: 6px;
	font-size: 1.0625rem;
	font-weight: 700;
	color: $textPrimary;
}

.funnel__step-desc
{
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.5;
}
</style>
