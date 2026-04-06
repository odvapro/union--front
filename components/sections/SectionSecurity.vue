<script setup>
	import { gsap } from '~/composables/useGsap';

	const { t } = useI18n();

	onMounted(() =>
	{
		gsap.fromTo('.security__text', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
			scrollTrigger: { trigger: '.security__inner', start: 'top 85%', once: true },
		});

		gsap.fromTo('.security__block', { autoAlpha: 0, y: 30 }, {
			autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out',
			scrollTrigger: { trigger: '.security__blocks', start: 'top 88%', once: true },
		});
	});
</script>

<template>
	<section id="security" class="section security">
		<div class="container">
			<div class="security__inner">
				<div class="security__text">
					<p class="security__label">{{ t('security.label') }}</p>
					<h2 class="section__title">
						{{ t('security.titlePart1') }}<br>{{ t('security.titlePart2') }}<span class="gold-text">{{ t('security.titleGold') }}</span>
					</h2>

					<div class="security__blocks">
						<div class="security__block">
							<div class="security__block-icon">
								<IconsIconShieldCheck class="g-icon-accent" />
							</div>
							<div>
								<h3 class="security__block-title">{{ t('security.b1Title') }}</h3>
								<p class="security__block-text">
									{{ t('security.b1Text') }}
								</p>
							</div>
						</div>

						<div class="security__block">
							<div class="security__block-icon">
								<IconsIconLock class="g-icon-accent" />
							</div>
							<div>
								<h3 class="security__block-title">{{ t('security.b2Title') }}</h3>
								<p class="security__block-text">
									{{ t('security.b2Text') }}
								</p>
							</div>
						</div>
					</div>

					<div class="security__quote">
						{{ t('security.quote') }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.security
{
	background: radial-gradient(ellipse at 80% 50%, rgba(var(--rgb-accent), 0.05) 0%, transparent 60%), $dark;
}

.security__inner
{
	display: flex;
	align-items: center;
}

.security__text { flex: 1; max-width: 700px; }

.security__label
{
	display: inline-block;
	margin-bottom: 16px;
	font-size: 0.8125rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
}

.security__blocks
{
	display: flex;
	flex-direction: column;
	gap: 28px;
	margin-top: 36px;
	margin-bottom: 36px;
}

.security__block
{
	display: flex;
	gap: 20px;
	align-items: flex-start;
}

.security__block-icon
{
	width: 52px;
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid $goldDim;
	border-radius: 10px;
	background: rgba(var(--rgb-accent), 0.04);
	flex-shrink: 0;
}

.security__block-title
{
	margin-bottom: 8px;
	font-size: 1.0625rem;
	font-weight: 700;
	color: $textPrimary;
}

.security__block-text
{
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}

.security__quote
{
	padding: 20px 24px;
	border-left: 3px solid $gold;
	background: rgba(var(--rgb-accent), 0.05);
	border-radius: 0 8px 8px 0;
	font-size: 1.0625rem;
	font-weight: 500;
	color: $textPrimary;
	font-style: italic;
}

</style>
