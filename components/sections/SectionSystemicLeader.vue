<script setup>
	import { gsap } from '~/composables/useGsap';
	import dataRu from '~/data/systemic-leader.ru.json';
	import dataEn from '~/data/systemic-leader.en.json';

	const { t, locale } = useI18n();

	const data = computed(() => (locale.value === 'en' ? dataEn : dataRu));

	onMounted(() =>
	{
		gsap.fromTo('.sl__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.sl__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.sl__session', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
			scrollTrigger: { trigger: '.sl__sessions', start: 'top 85%', once: true },
		});
	});
</script>

<template>
	<section id="systemic-leader" class="section sl">
		<div class="container">
			<div class="sl__header">
				<p class="section__label">{{ t('systematicLeader.label') }}</p>
				<h2 class="section__title">
					{{ t('systematicLeader.titleBefore') }}<span class="gold-text">{{ t('systematicLeader.titleGold') }}</span>
				</h2>
				<p class="section__subtitle">{{ t('systematicLeader.subtitle') }}</p>
			</div>

			<div class="sl__sessions">
				<div
					v-for="(session, sIdx) in data.sessions"
					:key="`sl-session-${sIdx}`"
					class="sl__session"
				>
					<h3 class="sl__session-title gold-text">{{ session.title }}</h3>
					<div class="sl__days">
						<div
							v-for="(day, dIdx) in session.days"
							:key="`sl-day-${sIdx}-${dIdx}`"
							class="sl__day gold-border"
						>
							<h4 class="sl__day-title">{{ day.title }}</h4>
							<ul class="sl__day-list">
								<li v-for="item in day.items" :key="item">{{ item }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.sl
{
	background: linear-gradient(180deg, $dark 0%, $darkCard 100%);
}

.sl__header
{
	margin-bottom: 48px;
}

.sl__sessions
{
	display: flex;
	flex-direction: column;
	gap: 48px;
}

.sl__session-title
{
	font-size: 0.9375rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: 20px;
	line-height: 1.4;
}

.sl__days
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;

	@include mq(0, 768) { grid-template-columns: 1fr; }
}

.sl__day
{
	padding: 28px;
	background: $darkCard;
	@include transition();

	&:hover { border-color: rgba(var(--rgb-accent), 0.4); }
}

.sl__day-title
{
	margin-bottom: 14px;
	font-size: 1rem;
	font-weight: 700;
	color: $textPrimary;
	line-height: 1.4;
}

.sl__day-list
{
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 6px;

	li
	{
		padding-left: 14px;
		position: relative;
		font-size: 0.8125rem;
		color: $textSecondary;
		line-height: 1.5;

		&::before
		{
			content: '';
			position: absolute;
			left: 0;
			top: 7px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background: $gold;
			opacity: 0.5;
		}
	}
}
</style>
