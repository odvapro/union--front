<script setup>
	import { gsap } from '~/composables/useGsap';

	onMounted(() =>
	{
		gsap.fromTo('.security__text', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
			scrollTrigger: { trigger: '.security__inner', start: 'top 85%', once: true },
		});

		gsap.fromTo('.security__shield', { autoAlpha: 0, y: 40, scale: 0.9 }, {
			autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out',
			scrollTrigger: { trigger: '.security__inner', start: 'top 85%', once: true },
		});

		gsap.fromTo('.security__block', { autoAlpha: 0, y: 30 }, {
			autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out',
			scrollTrigger: { trigger: '.security__blocks', start: 'top 88%', once: true },
		});
	});
</script>

<template>
	<section class="section security">
		<div class="container">
			<div class="security__inner">
				<div class="security__text">
					<p class="security__label">Безопасность и Эксклюзивность</p>
					<h2 class="section__title">
						Почему наш отбор<br>такой <span class="gold-text">строгий?</span>
					</h2>

					<div class="security__blocks">
						<div class="security__block">
							<div class="security__block-icon">
								<IconsIconShieldCheck style="color: #c9a84c" />
							</div>
							<div>
								<h3 class="security__block-title">Экологичность среды</h3>
								<p class="security__block-text">
									Проверка репутации и публичной истории гарантирует, что вас окружают
									только надёжные партнёры с прозрачным бизнесом.
								</p>
							</div>
						</div>

						<div class="security__block">
							<div class="security__block-icon">
								<IconsIconLock style="color: #c9a84c" />
							</div>
							<div>
								<h3 class="security__block-title">Абсолютная конфиденциальность</h3>
								<p class="security__block-text">
									Подписание NDA каждым резидентом создаёт закрытое пространство, где можно
									обсуждать реальные проблемы бизнеса без риска утечки.
								</p>
							</div>
						</div>
					</div>

					<div class="security__quote">
						Ваш уровень откровенности защищён на юридическом уровне.
					</div>
				</div>

				<div class="security__shield" aria-hidden="true">
					<IconsIconShieldLarge />
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.security
{
	background: radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 60%), $dark;
}

.security__inner
{
	display: flex;
	align-items: center;
	gap: 80px;

	@include mq(0, 900) { flex-direction: column; gap: 48px; }
}

.security__text { flex: 1; }

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
	background: rgba(201,168,76,0.04);
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
	background: rgba(201,168,76,0.05);
	border-radius: 0 8px 8px 0;
	font-size: 1.0625rem;
	font-weight: 500;
	color: $textPrimary;
	font-style: italic;
}

.security__shield
{
	flex-shrink: 0;
	opacity: 0.85;

	@include mq(0, 900) { display: none; }
}
</style>
