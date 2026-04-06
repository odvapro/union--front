<script setup>
	import { gsap } from '~/composables/useGsap';

	const navLinks = [
		{ label: 'О нас', href: '#about' },
		{ label: 'Уровни', href: '#levels' },
		{ label: 'Обучение', href: '#catalog' },
		{ label: 'Проекты', href: '#projects' },
		{ label: 'Заявка', href: '#application' },
	];

	function scrollTo(href)
	{
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	}

	onMounted(() =>
	{
		gsap.fromTo('.site-footer__top', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
			scrollTrigger: { trigger: '.site-footer', start: 'top 90%', once: true },
		});
	});

	const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="site-footer">
		<!-- Декоративная верхняя линия -->
		<div class="site-footer__border" aria-hidden="true" />

		<div class="site-footer__top">
			<div class="container site-footer__top-inner">

				<!-- Brand -->
				<div class="site-footer__brand">
					<a class="site-footer__logo" href="#" @click.prevent="scrollTo('#about')">
						<div class="site-footer__logo-mark">
							<IconsIconLogoMark :width="36" :height="36" />
						</div>
						<div class="site-footer__logo-text">
							<span class="site-footer__logo-name">UNION</span>
							<span class="site-footer__logo-sub">Consulting Group</span>
						</div>
					</a>

					<p class="site-footer__tagline">
						Экосистема для масштабирования<br>личности и бизнеса.
					</p>

					<div class="site-footer__badges">
						<span class="site-footer__badge">NDA</span>
						<span class="site-footer__badge">Закрытый клуб</span>
						<span class="site-footer__badge">5 уровней</span>
					</div>
				</div>

				<!-- Nav -->
				<div class="site-footer__col">
					<p class="site-footer__col-title">Навигация</p>
					<nav class="site-footer__nav">
						<a
							v-for="link in navLinks"
							:key="link.href"
							class="site-footer__nav-link"
							:href="link.href"
							@click.prevent="scrollTo(link.href)"
						>
							{{ link.label }}
						</a>
					</nav>
				</div>

				<!-- Contacts -->
				<div class="site-footer__col">
					<p class="site-footer__col-title">Контакты</p>
					<div class="site-footer__contacts">
						<a class="site-footer__contact-item" href="tel:+74950000000">
							<span class="site-footer__contact-icon">
								<IconsIconPhone :size="14" style="color: #c9a84c" />
							</span>
							+7 (495) 000-00-00
						</a>
						<a class="site-footer__contact-item" href="https://unionconsulting.ru" target="_blank">
							<span class="site-footer__contact-icon">
								<IconsIconGlobe :size="14" style="color: #c9a84c" />
							</span>
							unionconsulting.ru
						</a>
					</div>

					<a
						class="site-footer__apply"
						href="#application"
						@click.prevent="scrollTo('#application')"
					>
						Оставить заявку
						<IconsIconArrow :size="14" />
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="site-footer__bottom">
			<div class="container site-footer__bottom-inner">
				<p class="site-footer__copy">
					© {{ currentYear }} Union Consulting Group. Все права защищены.
				</p>
				<p class="site-footer__legal">
					Политика конфиденциальности · NDA при вступлении
				</p>
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
.site-footer
{
	background: $dark;
	position: relative;
}

// Декоративная граница с градиентом
.site-footer__border
{
	height: 1px;
	background: linear-gradient(
		90deg,
		transparent 0%,
		rgba(201,168,76,0.1) 20%,
		rgba(201,168,76,0.5) 50%,
		rgba(201,168,76,0.1) 80%,
		transparent 100%
	);
}

// Top section
.site-footer__top
{
	padding: 72px 0 64px;
}

.site-footer__top-inner
{
	display: grid;
	grid-template-columns: 1.6fr 1fr 1fr;
	gap: 48px;

	@include mq(768, 1024)
	{
		grid-template-columns: 1fr 1fr;
		.site-footer__brand { grid-column: 1 / -1; }
	}

	@include mq(0, 768)
	{
		grid-template-columns: 1fr;
		gap: 40px;
	}
}

// Brand
.site-footer__brand { display: flex; flex-direction: column; gap: 20px; }

.site-footer__logo
{
	display: inline-flex;
	align-items: center;
	gap: 10px;
	text-decoration: none;
}

.site-footer__logo-mark { line-height: 0; flex-shrink: 0; }

.site-footer__logo-text
{
	display: flex;
	flex-direction: column;
	line-height: 1;
}

.site-footer__logo-name
{
	font-size: 1.25rem;
	font-weight: 900;
	letter-spacing: 0.18em;
	color: $gold;
}

.site-footer__logo-sub
{
	font-size: 0.5625rem;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $textSecondary;
	margin-top: 2px;
}

.site-footer__tagline
{
	font-size: 1rem;
	color: $textSecondary;
	line-height: 1.6;
}

.site-footer__badges
{
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.site-footer__badge
{
	padding: 4px 12px;
	border: 1px solid rgba(201,168,76,0.25);
	border-radius: 100px;
	font-size: 0.6875rem;
	font-weight: 600;
	letter-spacing: 0.08em;
	color: $gold;
	background: rgba(201,168,76,0.05);
}

// Columns
.site-footer__col { display: flex; flex-direction: column; gap: 20px; }

.site-footer__col-title
{
	font-size: 0.6875rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: $gold;
	padding-bottom: 12px;
	border-bottom: 1px solid rgba(201,168,76,0.15);
}

// Nav
.site-footer__nav
{
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.site-footer__nav-link
{
	font-size: 0.9375rem;
	color: $textSecondary;
	text-decoration: none;
	@include transition();
	display: flex;
	align-items: center;
	gap: 8px;

	&::before
	{
		content: '';
		display: block;
		width: 16px;
		height: 1px;
		background: rgba(201,168,76,0.3);
		@include transition();
	}

	&:hover
	{
		color: $textPrimary;
		padding-left: 4px;
		&::before { width: 24px; background: $gold; }
	}
}

// Contacts
.site-footer__contacts
{
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.site-footer__contact-item
{
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 0.9375rem;
	color: $textSecondary;
	text-decoration: none;
	@include transition();

	&:hover { color: $textPrimary; }
}

.site-footer__contact-icon
{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	border: 1px solid rgba(201,168,76,0.2);
	border-radius: 6px;
	background: rgba(201,168,76,0.04);
	flex-shrink: 0;
}

.site-footer__apply
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-top: 8px;
	padding: 12px 20px;
	background: rgba(201,168,76,0.08);
	border: 1px solid rgba(201,168,76,0.3);
	border-radius: 8px;
	font-size: 0.875rem;
	font-weight: 600;
	color: $gold;
	text-decoration: none;
	@include transition();

	&:hover
	{
		background: $gold;
		color: $dark;
		border-color: $gold;
	}
}

// Bottom bar
.site-footer__bottom
{
	border-top: 1px solid rgba(255,255,255,0.04);
	padding: 20px 0;
	background: rgba(0,0,0,0.15);
}

.site-footer__bottom-inner
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.site-footer__copy
{
	font-size: 0.8125rem;
	color: rgba(160,168,184,0.5);
}

.site-footer__legal
{
	font-size: 0.75rem;
	color: rgba(160,168,184,0.35);

	@include mq(0, 480) { display: none; }
}
</style>
