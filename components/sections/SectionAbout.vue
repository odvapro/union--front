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
						<IconsIconBusiness style="color: #c9a84c" />
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
						<IconsIconNetwork style="color: #c9a84c" />
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
						<IconsIconEducation style="color: #c9a84c" />
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
