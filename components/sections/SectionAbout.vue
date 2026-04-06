<script setup>
	import { gsap, ScrollTrigger } from '~/composables/useGsap';

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
					Мы объединяем силу окружения,<br>
					<span class="gold-text">глубокую экспертизу</span> и образование
				</h2>
				<p class="section__subtitle about__lead">
					В единый механизм достижения ваших целей
				</p>
			</div>

			<div class="about__pillars">
				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="#c9a84c" stroke-width="1.5" fill="none"/>
							<path d="M20 12L28 16V24L20 28L12 24V16L20 12Z" fill="rgba(201,168,76,0.15)" stroke="#c9a84c" stroke-width="1"/>
						</svg>
					</div>
					<h3 class="about__pillar-title">Развитие Бизнеса</h3>
					<p class="about__pillar-text">
						Персональный и групповой консалтинг, инструменты развития для бизнеса и личности,
						Личный Совет Директоров.
					</p>
					<ul class="about__pillar-list">
						<li>Персональный консалтинг</li>
						<li>Групповые сессии</li>
						<li>Личный Совет Директоров</li>
					</ul>
				</div>

				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="20" cy="20" r="16" stroke="#c9a84c" stroke-width="1.5"/>
							<circle cx="20" cy="20" r="8" stroke="#c9a84c" stroke-width="1"/>
							<circle cx="20" cy="8" r="3" fill="rgba(201,168,76,0.3)" stroke="#c9a84c" stroke-width="1"/>
							<circle cx="30" cy="26" r="3" fill="rgba(201,168,76,0.3)" stroke="#c9a84c" stroke-width="1"/>
							<circle cx="10" cy="26" r="3" fill="rgba(201,168,76,0.3)" stroke="#c9a84c" stroke-width="1"/>
						</svg>
					</div>
					<h3 class="about__pillar-title">Среда и Взаимодействие</h3>
					<p class="about__pillar-text">
						Нетворкинг, мастермайнды, форумы со спикерами, бизнес-экскурсии в ведущие компании.
					</p>
					<ul class="about__pillar-list">
						<li>Ежемесячные форумы</li>
						<li>MasterMind / Codevelopment</li>
						<li>Бизнес-экскурсии</li>
					</ul>
				</div>

				<div class="about__pillar gold-border">
					<div class="about__pillar-icon">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="6" y="8" width="28" height="24" rx="2" stroke="#c9a84c" stroke-width="1.5" fill="none"/>
							<line x1="6" y1="16" x2="34" y2="16" stroke="#c9a84c" stroke-width="1"/>
							<line x1="14" y1="8" x2="14" y2="32" stroke="#c9a84c" stroke-width="1"/>
							<path d="M19 22L22 25L28 19" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
					<h3 class="about__pillar-title">Архитектура Знаний</h3>
					<p class="about__pillar-text">
						Тренинги, семинары, онлайн-курсы, акселлератор развития — более 17 программ
						от практикующих экспертов.
					</p>
					<ul class="about__pillar-list">
						<li>Тренинги и семинары</li>
						<li>Онлайн-курсы</li>
						<li>Акселлератор развития</li>
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

	&:hover { border-color: rgba(201,168,76,0.5); }
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
