<script setup>
	import { gsap } from '~/composables/useGsap';

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
					Эксклюзивные <span class="gold-text">проекты</span> сообщества
				</h2>
				<p class="section__subtitle">
					Дополнительные возможности для резидентов UNION
				</p>
			</div>

			<div class="projects__grid">
				<div class="projects__card gold-border">
					<div class="projects__card-icon">
						<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="6" y="8" width="36" height="32" rx="3" stroke="#c9a84c" stroke-width="1.5"/>
							<path d="M6 18H42" stroke="#c9a84c" stroke-width="1.5"/>
							<path d="M18 8V18" stroke="#c9a84c" stroke-width="1.5"/>
							<circle cx="33" cy="33" r="6" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" stroke-width="1.5"/>
							<path d="M30 33L32 35L36 31" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>

					<div class="projects__card-label">Для вашего бизнеса</div>
					<h3 class="projects__card-title">
						Отдел развития компетенций на аутсорсе
					</h3>
					<p class="projects__card-desc">
						Мы берём на себя функцию корпоративного обучения — от диагностики до внедрения системы оценки сотрудников.
					</p>

					<ul class="projects__card-list">
						<li>
							<span class="projects__list-icon">→</span>
							Анализ потребностей и выявление пробелов (карта компетенций)
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							Разработка индивидуальных программ обучения
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							Внедрение систем оценки и дистанционного обучения (LMS)
						</li>
					</ul>
				</div>

				<div class="projects__card gold-border">
					<div class="projects__card-icon">
						<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="#c9a84c" stroke-width="1.5"/>
							<path d="M24 14L34 19V29L24 34L14 29V19L24 14Z" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" stroke-width="1"/>
							<circle cx="24" cy="24" r="3" fill="#c9a84c"/>
						</svg>
					</div>

					<div class="projects__card-label">Для вашего будущего</div>
					<h3 class="projects__card-title">
						Школа юных предпринимателей «Наследие»
					</h3>
					<p class="projects__card-desc">
						Программа для детей и молодёжи резидентов: практическое погружение в мир предпринимательства под руководством наставников.
					</p>

					<ul class="projects__card-list">
						<li>
							<span class="projects__list-icon">→</span>
							Обучение основам предпринимательства и финансовой грамотности
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							Развитие лидерских навыков у молодёжи
						</li>
						<li>
							<span class="projects__list-icon">→</span>
							Практические проекты и стартапы под руководством наставников-резидентов
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

	&:hover { border-color: rgba(201,168,76,0.5); }
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
