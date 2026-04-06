<script setup>
	import { gsap } from '~/composables/useGsap';
	import catalogRu from '~/data/catalog-categories.ru.json';
	import catalogEn from '~/data/catalog-categories.en.json';

	const { t, locale } = useI18n();

	const categories = computed(() => (locale.value === 'en' ? catalogEn : catalogRu));

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
</script>

<template>
	<section id="catalog" class="section catalog">
		<div class="container">
			<div class="catalog__header">
				<h2 class="section__title">
					{{ t('catalog.titleBefore') }}<span class="gold-text">{{ t('catalog.titleGold') }}</span>
				</h2>
				<p class="section__subtitle">
					{{ t('catalog.subtitle') }}
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
		background: rgba(var(--rgb-accent), 0.1);
		border-color: $gold;
		color: $gold;
	}

	&:hover:not(&--active) { border-color: rgba(var(--rgb-accent), 0.3); color: $textPrimary; }
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

	&:hover { border-color: rgba(var(--rgb-accent), 0.4); }
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
