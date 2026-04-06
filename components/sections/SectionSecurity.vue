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
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
									<path d="M14 3L23 7V14C23 19 18.5 23.4 14 25C9.5 23.4 5 19 5 14V7L14 3Z"
										stroke="#c9a84c" stroke-width="1.5" fill="none"/>
									<path d="M9 14L12 17L19 10" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
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
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
									<rect x="5" y="12" width="18" height="13" rx="2" stroke="#c9a84c" stroke-width="1.5"/>
									<path d="M9 12V9C9 6.8 11.2 5 14 5C16.8 5 19 6.8 19 9V12"
										stroke="#c9a84c" stroke-width="1.5" fill="none"/>
									<circle cx="14" cy="18" r="2" fill="#c9a84c"/>
								</svg>
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
					<svg width="280" height="320" viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M140 20L240 60V160C240 230 195 285 140 305C85 285 40 230 40 160V60L140 20Z"
							fill="rgba(201,168,76,0.03)" stroke="rgba(201,168,76,0.2)" stroke-width="1.5"/>
						<path d="M140 50L210 80V155C210 210 178 253 140 270C102 253 70 210 70 155V80L140 50Z"
							fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
						<path d="M140 80L185 100V150C185 188 165 216 140 228C115 216 95 188 95 150V100L140 80Z"
							fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.4)" stroke-width="1"/>

						<line x1="80" y1="110" x2="200" y2="110" stroke="rgba(201,168,76,0.15)" stroke-width="0.5"/>
						<line x1="70" y1="140" x2="210" y2="140" stroke="rgba(201,168,76,0.15)" stroke-width="0.5"/>
						<line x1="75" y1="170" x2="205" y2="170" stroke="rgba(201,168,76,0.1)" stroke-width="0.5"/>
						<line x1="90" y1="200" x2="190" y2="200" stroke="rgba(201,168,76,0.08)" stroke-width="0.5"/>

						<path d="M115 160L130 175L165 140" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
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
