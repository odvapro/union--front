<script setup>
	import { gsap } from '~/composables/useGsap';

	const activeCategory = ref(0);

	onMounted(() =>
	{
		gsap.fromTo('.catalog__header', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.catalog__header', start: 'top 85%', once: true },
		});

		gsap.fromTo('.catalog__cat-btn', { autoAlpha: 0, y: 20 }, {
			autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
			scrollTrigger: { trigger: '.catalog__cats', start: 'top 88%', once: true },
		});
	});

	// Реанимировать карточки при смене категории
	watch(() => activeCategory.value, () =>
	{
		nextTick(() =>
		{
			gsap.fromTo('.catalog__course', { autoAlpha: 0, y: 30 }, {
				autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out',
			});
		});
	});

	const categories = [
		{
			name: 'Стратегия и Системность',
			courses: [
				{
					num: '01',
					title: 'Стратегическое планирование: от видения к результату',
					items: [
						'Миссия и ключевые приоритеты бизнеса',
						'Стратегическое планирование',
						'Карта целей и ответственность команды',
						'Инструменты менеджмента для перевода стратегии в тактику',
					],
				},
				{
					num: '02',
					title: 'Жизненный цикл организаций',
					items: [
						'Этапы жизненного цикла компании',
						'Карта управленческих циклов',
						'Кросс-функциональные конфликты и технологии решений',
						'Программа организационной трансформации',
					],
				},
				{
					num: '03',
					title: 'Управленческий цикл',
					items: [
						'Система управления без руководителя',
						'Навыки постановки задач и получения результата',
						'Алгоритмы управления личной и командной эффективностью',
					],
				},
				{
					num: '08',
					title: 'Продажи по-новому: от контакта к ценности',
					items: [
						'Продажа решений и создание долгосрочных отношений',
						'Диагностика типов клиентов',
						'Выявление скрытых потребностей и работа с возражениями',
					],
				},
				{
					num: '09',
					title: 'Бизнес как система: как перестать тушить «пожары»',
					items: [
						'Анализ и улучшение бизнес-процессов',
						'Переход от «работы в бизнесе» к управлению бизнесом',
						'Разработка макетов бизнес-процессов',
					],
				},
			],
		},
		{
			name: 'Команда и Культура',
			courses: [
				{
					num: '04',
					title: 'Вовлечённость и мотивация команды',
					items: [
						'Измерение и повышение вовлечённости без давления',
						'Анализ и устранение узких мест командной динамики',
						'Формирование культуры открытости и инициативности',
					],
				},
				{
					num: '05',
					title: 'Как нанимать продуктивных сотрудников',
					items: [
						'Определение перформеров и эффективное собеседование',
						'Инструменты удержания ключевых сотрудников',
						'Единые правила подбора и построение профиля команды',
					],
				},
				{
					num: '10',
					title: 'Менеджмент 3.0: управление без стресса',
					items: [
						'Осознанное управление результатом без давления',
						'Инструменты делегирования и контроля',
						'Нематериальная мотивация персонала',
					],
				},
				{
					num: '11',
					title: 'Этапы развития команды',
					items: [
						'Диагностика стадии развития команды',
						'Методы управления командной динамикой',
						'Эффективная мотивация под цели и ценности',
					],
				},
				{
					num: '12',
					title: 'Экология человека в бизнесе',
					items: [
						'Создание корпоративной культуры как конкурентного преимущества',
						'Связь физиологии и результативности',
						'Удержание талантов и снижение текучести',
					],
				},
			],
		},
		{
			name: 'Личная Эффективность и Инструменты',
			courses: [
				{
					num: '13',
					title: 'Ресурсное состояние',
					items: [
						'Управление физической, эмоциональной и ментальной энергией',
						'Диагностика уровня выгорания и методы восстановления',
						'Техники быстрого восстановления без отвлечения от работы',
					],
				},
				{
					num: '14',
					title: 'Эмоциональный интеллект руководителя',
					items: [
						'Управление эмоциями для повышения продуктивности коллектива',
						'Создание климата доверия и ответственности',
						'Управление групповой динамикой для мотивации',
					],
				},
				{
					num: '15',
					title: 'Тайм-менеджмент для руководителей',
					items: [
						'Системы планирования, повышающие продуктивность до 30%',
						'Техники делегирования и фокусировки',
						'Формирование «идеального дня»',
					],
				},
				{
					num: '16',
					title: 'Excel для бизнеса: данные, аналитика и эффективность',
					items: [
						'Автоматизация отчётов и сложные таблицы',
						'Визуализация данных и оптимизация рутины',
						'Практические кейсы из бизнеса участников',
					],
				},
				{
					num: '17',
					title: 'Навыки презентации: структура и ясность',
					items: [
						'Принципы создания убедительных презентаций',
						'Навыки сторителлинга и визуального дизайна',
						'Алгоритмы подготовки и проведения презентаций',
					],
				},
			],
		},
	];
</script>

<template>
	<section id="catalog" class="section catalog">
		<div class="container">
			<div class="catalog__header">
				<h2 class="section__title">
					Каталог <span class="gold-text">обучений</span>
				</h2>
				<p class="section__subtitle">
					17 программ в трёх направлениях от практикующих экспертов
				</p>
			</div>

			<div class="catalog__cats">
				<button
					v-for="(cat, i) in categories"
					:key="cat.name"
					class="catalog__cat-btn"
					:class="{ 'catalog__cat-btn--active': activeCategory === i }"
					@click="activeCategory = i"
				>
					{{ cat.name }}
				</button>
			</div>

			<div class="catalog__courses">
				<div
					v-for="course in categories[activeCategory].courses"
					:key="course.num"
					class="catalog__course gold-border"
				>
					<span class="catalog__course-num">{{ course.num }}</span>
					<div class="catalog__course-body">
						<h3 class="catalog__course-title">{{ course.title }}</h3>
						<ul class="catalog__course-list">
							<li v-for="item in course.items" :key="item">{{ item }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.catalog__header { margin-bottom: 40px; }

.catalog__cats
{
	display: flex;
	gap: 8px;
	margin-bottom: 32px;
	flex-wrap: wrap;
}

.catalog__cat-btn
{
	padding: 10px 20px;
	background: $darkCard;
	border: 1px solid $darkBorder;
	border-radius: 6px;
	font-size: 0.9375rem;
	color: $textSecondary;
	cursor: pointer;
	@include transition();

	&--active
	{
		background: rgba(201,168,76,0.1);
		border-color: $gold;
		color: $gold;
	}

	&:hover:not(&--active) { border-color: rgba(201,168,76,0.3); color: $textPrimary; }
}

.catalog__courses
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;

	@include mq(0, 768) { grid-template-columns: 1fr; }
}

.catalog__course
{
	display: flex;
	gap: 20px;
	padding: 28px;
	background: $darkCard;
	@include transition();

	&:hover { border-color: rgba(201,168,76,0.4); }
}

.catalog__course-num
{
	font-size: 0.75rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	color: $gold;
	opacity: 0.5;
	flex-shrink: 0;
	padding-top: 3px;
}

.catalog__course-title
{
	margin-bottom: 12px;
	font-size: 1rem;
	font-weight: 700;
	color: $textPrimary;
	line-height: 1.4;
}

.catalog__course-list
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
