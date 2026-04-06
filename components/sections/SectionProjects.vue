<script setup>
	import { gsap } from '~/composables/useGsap';

	const { t } = useI18n();

	onMounted(() =>
	{
		gsap.fromTo('.projects__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.projects__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.projects__card', { autoAlpha: 0, y: 60, scale: 0.97 }, {
			autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out',
			scrollTrigger: { trigger: '.projects__grid', start: 'top 85%', once: true },
		});
	});
</script>

<template>
	<section id="projects" class="section projects">
		<div class="container">
			<div class="projects__header">
				<h2 class="section__title">
					{{ t('projects.titleBefore') }}<span class="gold-text">{{ t('projects.titleGold') }}</span>{{ t('projects.titleAfter') }}
				</h2>
				<p class="section__subtitle">
					{{ t('projects.subtitle') }}
				</p>
			</div>

			<div class="projects__grid">
				<div class="projects__card gold-border">
					<div class="projects__card-icon">
						<IconsIconProjectCorp class="g-icon-accent" />
					</div>

					<div class="projects__card-label">{{ t('projects.c1Label') }}</div>
					<h3 class="projects__card-title">
						{{ t('projects.c1Title') }}
					</h3>
					<p class="projects__card-desc">
						{{ t('projects.c1Desc') }}
					</p>

					<ul class="projects__card-list">
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c1Li1') }}
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c1Li2') }}
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c1Li3') }}
						</li>
					</ul>
				</div>

				<div class="projects__card gold-border">
					<div class="projects__card-icon">
						<IconsIconProjectHeritage class="g-icon-accent" />
					</div>

					<div class="projects__card-label">{{ t('projects.c2Label') }}</div>
					<h3 class="projects__card-title">
						{{ t('projects.c2Title') }}
					</h3>
					<p class="projects__card-desc">
						{{ t('projects.c2Desc') }}
					</p>

					<ul class="projects__card-list">
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c2Li1') }}
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c2Li2') }}
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							{{ t('projects.c2Li3') }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.projects__header { margin-bottom: 56px; }

.projects__grid
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 24px;

	@include mq(0, 768) { grid-template-columns: 1fr; }
}

.projects__card
{
	padding: 40px;
	background: $darkCard;
	@include transition();

	&:hover { border-color: rgba(var(--rgb-accent), 0.5); }
}

.projects__card-icon { margin-bottom: 24px; }

.projects__card-label
{
	margin-bottom: 8px;
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $gold;
}

.projects__card-title
{
	margin-bottom: 16px;
	font-size: 1.375rem;
	font-weight: 700;
	color: $textPrimary;
	line-height: 1.3;
}

.projects__card-desc
{
	margin-bottom: 24px;
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}

.projects__card-list
{
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 12px;

	li
	{
		display: flex;
		gap: 10px;
		font-size: 0.9375rem;
		color: $textSecondary;
		line-height: 1.5;
	}
}

.projects__list-icon
{
	color: $gold;
	flex-shrink: 0;
	font-weight: 700;
}
</style>
