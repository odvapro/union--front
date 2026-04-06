<script setup>
	import { gsap } from '~/composables/useGsap';

	const { contactPhoneHref } = usePublicSite();

	onMounted(() =>
	{
		gsap.fromTo('.membership__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.membership__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.membership__tab', { autoAlpha: 0, y: 20 }, {
			autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
			scrollTrigger: { trigger: '.membership__tabs', start: 'top 88%', once: true },
		});

		gsap.fromTo('.membership__card', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
			scrollTrigger: { trigger: '.membership__card', start: 'top 88%', once: true },
		});

		gsap.fromTo('.membership__founder', { autoAlpha: 0, y: 30 }, {
			autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
			scrollTrigger: { trigger: '.membership__founder', start: 'top 90%', once: true },
		});
	});

	const plans = [
		{
			name: 'START',
			tag: 'Фундамент',
			audience: 'Начинающие предприниматели и те, кто в найме',
			price: '15 000 ₽ / мес',
			priceVisit: '5 000 ₽ / визит',
			color: '#a07840',
			blocks: [
				{
					title: 'Образование',
					items: [
						'Льготный доступ к курсам Нетологии',
						'Акселлератор для начинающих предпринимателей',
						'Акселлератор для тех, кто в найме',
						'Скидка 10% на образовательные продукты UNION',
					],
				},
				{
					title: 'Консалтинг',
					items: [
						'Ежегодная персональная диагностика — аудит личности',
						'1 групповая консультация в месяц от экспертов UNION',
						'2 групповые консультации в год от резидентов BUSINESS',
					],
				},
				{
					title: 'Нетворкинг',
					items: [
						'Ежемесячный форум со спикерами',
						'Ежемесячный MasterMind / Codevelopment',
						'Ежегодный нетворкинг с резидентами BUSINESS',
						'Общая ежегодная встреча резидентов UNION',
					],
				},
				{
					title: 'Сопровождение',
					items: ['Групповой комьюнити менеджер'],
				},
			],
		},
		{
			name: 'BUSINESS',
			tag: 'Масштабирование',
			audience: 'Предприниматели с оборотом 100–500 млн в год',
			price: '45 000 ₽ / мес',
			priceVisit: '10 000 ₽ / визит',
			note: '+ полный доступ к опциям пакета START',
			color: '#c9a84c',
			featured: true,
			blocks: [
				{
					title: 'Образование',
					items: [
						'Льготный доступ к курсам Нетологии для резидента и сотрудников',
						'Ежемесячный доступ 1 сотрудника на акселлератор',
						'Доступ к ежемесячным оффлайн семинарам (50+ уроков)',
						'2 доступа к семинарам для сотрудников 1 раз в год',
						'Скидка 15% на образовательные продукты UNION',
					],
				},
				{
					title: 'Консалтинг',
					items: [
						'Ежегодная диагностика с расшифровкой от эксперта',
						'1 персональная 2-часовая консультация в месяц',
						'2 групповые консультации в год от резидентов PREMIER',
						'Личный Совет Директоров 2 раза в год',
						'Курс «Управление жизненным циклом» стоимостью 200 тыс. ₽',
					],
				},
				{
					title: 'Нетворкинг',
					items: [
						'Ежемесячный форум и MasterMind с резидентами BUSINESS',
						'Бизнес-экскурсии к резидентам клуба',
						'2 ежегодных нетворкинга с резидентами PREMIER',
						'Организация своего мероприятия на площадке UNION 2 раза в год',
					],
				},
				{
					title: 'Сопровождение',
					items: ['Персональный комьюнити менеджер'],
				},
			],
		},
		{
			name: 'PREMIER',
			tag: 'Влияние',
			audience: 'Предприниматели с оборотом от 500 млн в год',
			price: 'По рекомендации',
			note: '+ полный доступ к START и BUSINESS',
			lock: true,
			color: '#e8c97a',
			blocks: [
				{
					title: 'Образование',
					items: [
						'Неограниченный доступ к оффлайн семинарам',
						'4 доступа к семинарам для сотрудников 1 раз в год',
						'Скидка 20% на образовательные продукты UNION',
					],
				},
				{
					title: 'Консалтинг',
					items: [
						'Диагностика + ИПР с экспертом UNION',
						'2 персональные консультации в месяц + трекинг',
						'2-дневная стратегическая сессия 1 раз в год',
						'Личный Совет Директоров 2 раза в год',
					],
				},
				{
					title: 'Нетворкинг',
					items: [
						'Закрытый ужин со спикером ежемесячно',
						'Бизнес-экскурсии в крупные компании России и мира',
						'Членство в Совете Union (влияние на повестку)',
						'Организация мероприятия на площадке UNION 4 раза в год',
					],
				},
				{
					title: 'Сопровождение',
					items: ['Персональный комьюнити менеджер'],
				},
			],
		},
	];

	const activePlan = ref(0);
</script>

<template>
	<section id="membership" class="section membership">
		<div class="container">
			<div class="membership__header">
				<h2 class="section__title">
					Выберите <span class="gold-text">свой уровень</span>
				</h2>
				<p class="section__subtitle">
					Каждый следующий уровень включает все преимущества предыдущего
				</p>
			</div>

			<div class="membership__tabs">
				<button
					v-for="(plan, i) in plans"
					:key="plan.name"
					class="membership__tab"
					:class="{ 'membership__tab--active': activePlan === i }"
					@click="activePlan = i"
				>
					<span class="membership__tab-name">{{ plan.name }}</span>
					<span class="membership__tab-tag">{{ plan.tag }}</span>
				</button>
			</div>

			<div class="membership__card gold-border">
				<div class="membership__card-head">
					<div>
						<div class="membership__card-name" :style="{ color: plans[activePlan].color }">
							{{ plans[activePlan].name }}
							<span v-if="plans[activePlan].lock"> 🔒</span>
						</div>
						<div class="membership__card-audience">{{ plans[activePlan].audience }}</div>
					</div>
					<div class="membership__card-pricing">
						<div class="membership__price-main">{{ plans[activePlan].price }}</div>
						<div v-if="plans[activePlan].priceVisit" class="membership__price-visit">
							{{ plans[activePlan].priceVisit }}
						</div>
						<div v-if="plans[activePlan].note" class="membership__price-note">
							{{ plans[activePlan].note }}
						</div>
					</div>
				</div>

				<div class="membership__blocks">
					<div
						v-for="block in plans[activePlan].blocks"
						:key="block.title"
						class="membership__block"
					>
						<h4 class="membership__block-title">{{ block.title }}</h4>
						<ul class="membership__block-list">
							<li v-for="item in block.items" :key="item">{{ item }}</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="membership__founder gold-border">
				<div class="membership__founder-content">
					<div class="membership__founder-badge">FOUNDER</div>
					<h3 class="membership__founder-title">Особый формат участия</h3>
					<p class="membership__founder-text">
						Для владельцев бизнеса, готовых к глубокой личной и командной трансформации.
					</p>
					<ul class="membership__founder-list">
						<li>2-дневная стратегическая сессия от эксперта</li>
						<li>Персональное сопровождение: 52 встречи в год (21 онлайн + 21 оффлайн)</li>
						<li>Участие в закрытых сессиях с основателями UNION 2 раза в год</li>
					</ul>
				</div>
				<a
					class="membership__founder-cta"
					:href="contactPhoneHref"
				>
					Обсудить условия
				</a>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.membership__header { margin-bottom: 40px; }

.membership__tabs
{
	display: flex;
	gap: 8px;
	margin-bottom: 2px;
	flex-wrap: wrap;
}

.membership__tab
{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 14px 24px;
	background: $darkCard;
	border: 1px solid $darkBorder;
	border-bottom: none;
	border-radius: 8px 8px 0 0;
	cursor: pointer;
	@include transition();

	&--active
	{
		background: rgba(201,168,76,0.08);
		border-color: $gold;
		border-bottom-color: transparent;
	}

	&:hover:not(&--active) { border-color: rgba(201,168,76,0.3); }
}

.membership__tab-name
{
	font-size: 1rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	color: $gold;
}

.membership__tab-tag
{
	font-size: 0.75rem;
	color: $textSecondary;
}

.membership__card
{
	padding: 40px;
	background: $darkCard;
	border-radius: 0 8px 8px 8px;
	margin-bottom: 24px;
}

.membership__card-head
{
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 24px;
	margin-bottom: 36px;
	padding-bottom: 28px;
	border-bottom: 1px solid $darkBorder;

	@include mq(0, 640) { flex-direction: column; }
}

.membership__card-name
{
	font-size: 1.75rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	margin-bottom: 6px;
}

.membership__card-audience
{
	font-size: 0.9375rem;
	color: $textSecondary;
}

.membership__card-pricing { text-align: right; @include mq(0, 640) { text-align: left; } }

.membership__price-main
{
	font-size: 1.25rem;
	font-weight: 700;
	color: $textPrimary;
}

.membership__price-visit
{
	font-size: 0.875rem;
	color: $textSecondary;
	margin-top: 4px;
}

.membership__price-note
{
	margin-top: 8px;
	font-size: 0.8125rem;
	color: $gold;
	font-style: italic;
}

.membership__blocks
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 32px;

	@include mq(0, 640) { grid-template-columns: 1fr; }
}

.membership__block-title
{
	margin-bottom: 12px;
	font-size: 0.8125rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $gold;
}

.membership__block-list
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
		line-height: 1.5;

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
			opacity: 0.6;
		}
	}
}

.membership__founder
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 32px;
	padding: 36px 40px;
	background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, $darkCard 100%);

	@include mq(0, 768) { flex-direction: column; align-items: flex-start; }
}

.membership__founder-badge
{
	display: inline-block;
	margin-bottom: 12px;
	padding: 4px 14px;
	border: 1px solid $gold;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 800;
	letter-spacing: 0.15em;
	color: $gold;
}

.membership__founder-title
{
	margin-bottom: 8px;
	font-size: 1.25rem;
	font-weight: 700;
	color: $textPrimary;
}

.membership__founder-text
{
	margin-bottom: 16px;
	font-size: 0.9375rem;
	color: $textSecondary;
}

.membership__founder-list
{
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 6px;

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

.membership__founder-cta
{
	display: inline-flex;
	align-items: center;
	padding: 14px 28px;
	border: 1px solid $gold;
	border-radius: 8px;
	font-size: 0.9375rem;
	font-weight: 600;
	color: $gold;
	text-decoration: none;
	white-space: nowrap;
	flex-shrink: 0;
	@include transition();

	&:hover { background: $gold; color: $dark; }
}
</style>
