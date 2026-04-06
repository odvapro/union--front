<script setup>
	import { gsap } from '~/composables/useGsap';

	const menuOpen = ref(false);
	const scrolled = ref(false);
	const overlayRef = ref(null);
	const menuLinksRef = ref(null);

	const navLinks = [
		{ label: 'О нас', href: '#about', num: '01' },
		{ label: 'Уровни', href: '#levels', num: '02' },
		{ label: 'Обучение', href: '#catalog', num: '03' },
		{ label: 'Проекты', href: '#projects', num: '04' },
		{ label: 'Заявка', href: '#application', num: '05' },
	];

	function scrollTo(href)
	{
		closeMenu();
		setTimeout(() =>
		{
			const el = document.querySelector(href);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}, menuOpen.value ? 500 : 0);
	}

	async function openMenu()
	{
		menuOpen.value = true;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		await nextTick();

		gsap.fromTo('.nav-overlay',
			{ clipPath: 'inset(0 0 100% 0)' },
			{ clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.inOut' },
		);

		gsap.fromTo('.nav-overlay__link',
			{ x: -32, autoAlpha: 0 },
			{ x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.3 },
		);

		gsap.fromTo('.nav-overlay__bottom',
			{ autoAlpha: 0, y: 12 },
			{ autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.62 },
		);
	}

	function closeMenu()
	{
		gsap.to('.nav-overlay__link', {
			x: 24, autoAlpha: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in',
		});

		gsap.to('.nav-overlay__bottom', {
			autoAlpha: 0, duration: 0.15, ease: 'power2.in',
		});

		gsap.to('.nav-overlay',
			{
				clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'power4.inOut', delay: 0.18,
				onComplete: () =>
				{
					menuOpen.value = false;
					document.documentElement.style.overflow = '';
					document.body.style.overflow = '';
				},
			},
		);
	}

	function toggleMenu()
	{
		menuOpen.value ? closeMenu() : openMenu();
	}

	// Изменение фона хедера при скролле
	onMounted(() =>
	{
		const handler = () => { scrolled.value = window.scrollY > 40; };
		window.addEventListener('scroll', handler, { passive: true });
		onUnmounted(() => window.removeEventListener('scroll', handler));
	});
</script>

<template>
	<header class="hdr" :class="{ 'hdr--scrolled': scrolled, 'hdr--menu-open': menuOpen }">
		<div class="container hdr__inner">

			<!-- Logo -->
			<a class="hdr__logo" href="#" @click.prevent="scrollTo('#about')">
				<div class="hdr__logo-mark">
					<IconsIconLogoMark />
				</div>
				<div class="hdr__logo-text">
					<span class="hdr__logo-name">UNION</span>
					<span class="hdr__logo-sub">Consulting Group</span>
				</div>
			</a>

			<!-- Desktop nav -->
			<nav class="hdr__nav">
				<a
					v-for="link in navLinks"
					:key="link.href"
					class="hdr__nav-link"
					:href="link.href"
					@click.prevent="scrollTo(link.href)"
				>
					{{ link.label }}
				</a>
			</nav>

			<!-- Desktop CTA -->
			<a
				class="hdr__cta"
				href="#application"
				@click.prevent="scrollTo('#application')"
			>
				Вступить
			</a>

			<!-- Burger -->
			<button
				class="hdr__burger"
				:class="{ 'hdr__burger--active': menuOpen }"
				aria-label="Открыть меню"
				@click="toggleMenu"
			>
				<span class="hdr__burger-bar" />
				<span class="hdr__burger-bar" />
			</button>
		</div>
	</header>

	<!-- Fullscreen overlay -->
	<Teleport to="body">
		<div v-if="menuOpen" class="nav-overlay">
			<div class="nav-overlay__bg" />

			<div class="nav-overlay__inner">
				<!-- Links -->
				<nav class="nav-overlay__nav">
					<a
						v-for="link in navLinks"
						:key="link.href"
						class="nav-overlay__link"
						:href="link.href"
						@click.prevent="scrollTo(link.href)"
					>
						<span class="nav-overlay__link-num">{{ link.num }}</span>
						<span class="nav-overlay__link-label">{{ link.label }}</span>
						<IconsIconArrow class="nav-overlay__link-arrow" :size="20" />
					</a>
				</nav>

				<!-- Bottom -->
				<div class="nav-overlay__bottom">
					<a
						class="nav-overlay__cta"
						href="#application"
						@click.prevent="scrollTo('#application')"
					>
						Оставить заявку
					</a>
					<div class="nav-overlay__contacts">
						<a href="tel:+74950000000" class="nav-overlay__contact">+7 (495) 000-00-00</a>
						<span class="nav-overlay__contact-sep">·</span>
						<a href="https://unionconsulting.ru" class="nav-overlay__contact" target="_blank">unionconsulting.ru</a>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style lang="scss">
// ── Header ────────────────────────────────────────────────────────
.hdr
{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 400;
	@include transition();

	&--scrolled,
	&--menu-open
	{
		background: rgba(13, 27, 46, 0.98);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid $darkBorder;
		box-shadow: 0 4px 32px rgba(0,0,0,0.3);
	}
}

.hdr__inner
{
	display: flex;
	align-items: center;
	height: 76px;
	gap: 0;
}

// Logo
.hdr__logo
{
	display: flex;
	align-items: center;
	gap: 10px;
	text-decoration: none;
	flex-shrink: 0;
	margin-right: auto;
}

.hdr__logo-mark { line-height: 0; flex-shrink: 0; }

.hdr__logo-text
{
	display: flex;
	flex-direction: column;
	line-height: 1;
}

.hdr__logo-name
{
	font-size: 1.1875rem;
	font-weight: 900;
	letter-spacing: 0.18em;
	color: $gold;
}

.hdr__logo-sub
{
	font-size: 0.5625rem;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $textSecondary;
	margin-top: 2px;
}

// Desktop nav
.hdr__nav
{
	display: flex;
	align-items: center;
	gap: 36px;
	margin-right: 36px;

	@include mq(0, 960) { display: none; }
}

.hdr__nav-link
{
	position: relative;
	font-size: 0.875rem;
	font-weight: 500;
	color: $textSecondary;
	text-decoration: none;
	letter-spacing: 0.02em;
	@include transition();

	&::after
	{
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 1px;
		background: $gold;
		@include transition();
	}

	&:hover
	{
		color: $textPrimary;
		&::after { width: 100%; }
	}
}

// CTA
.hdr__cta
{
	display: inline-flex;
	align-items: center;
	padding: 10px 22px;
	border: 1px solid rgba(201,168,76,0.5);
	border-radius: 6px;
	font-size: 0.875rem;
	font-weight: 600;
	color: $gold;
	text-decoration: none;
	letter-spacing: 0.03em;
	@include transition();
	flex-shrink: 0;

	&:hover
	{
		background: $gold;
		color: $dark;
		border-color: $gold;
		box-shadow: 0 0 20px rgba(201,168,76,0.25);
	}

	@include mq(0, 960) { display: none; }
}

// Burger
.hdr__burger
{
	display: none;
	flex-direction: column;
	justify-content: center;
	gap: 7px;
	width: 40px;
	height: 40px;
	background: rgba(201,168,76,0.06);
	border: 1px solid rgba(201,168,76,0.2);
	border-radius: 8px;
	cursor: pointer;
	padding: 0 10px;
	flex-shrink: 0;
	@include transition();

	@include mq(0, 960) { display: flex; }

	&:hover
	{
		background: rgba(201,168,76,0.12);
		border-color: rgba(201,168,76,0.4);
	}
}

.hdr__burger-bar
{
	display: block;
	height: 1.5px;
	background: $gold;
	@include transition();

	.hdr__burger--active &:nth-child(1)
	{
		transform: translateY(4.25px) rotate(45deg);
	}

	.hdr__burger--active &:nth-child(2)
	{
		transform: translateY(-4.25px) rotate(-45deg);
	}
}

// ── Overlay menu ──────────────────────────────────────────────────
.nav-overlay
{
	position: fixed;
	inset: 0;
	z-index: 300;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.nav-overlay__bg
{
	position: absolute;
	inset: 0;
	background: rgba(13, 27, 46, 0.98);
	backdrop-filter: blur(16px);
	border-top: 1px solid $darkBorder;
}

.nav-overlay__inner
{
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 76px 0 40px;
	max-width: 960px;
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
}

.nav-overlay__nav
{
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 0 24px;
	border-top: 1px solid $darkBorder;
}

.nav-overlay__link
{
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 18px 0;
	border-bottom: 1px solid $darkBorder;
	text-decoration: none;
	@include transition();

	&:hover
	{
		padding-left: 12px;

		.nav-overlay__link-num { opacity: 1; }
		.nav-overlay__link-label { color: $gold; }
		.nav-overlay__link-arrow { opacity: 1; transform: translateX(6px); color: $gold; }
	}
}

.nav-overlay__link-num
{
	font-size: 0.625rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	color: $gold;
	opacity: 0.35;
	flex-shrink: 0;
	width: 22px;
	@include transition();
}

.nav-overlay__link-label
{
	font-size: clamp(1.25rem, 4vw, 1.75rem);
	font-weight: 700;
	color: $textPrimary;
	letter-spacing: -0.01em;
	flex: 1;
	@include transition();
}

.nav-overlay__link-arrow
{
	color: $gold;
	opacity: 0;
	flex-shrink: 0;
	@include transition();
}

.nav-overlay__bottom
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	margin-top: 32px;
	padding: 24px 24px 0;
	border-top: 1px solid $darkBorder;
}

.nav-overlay__cta
{
	display: inline-flex;
	align-items: center;
	padding: 10px 22px;
	border: 1px solid rgba(201,168,76,0.5);
	border-radius: 6px;
	font-size: 0.875rem;
	font-weight: 600;
	color: $gold;
	text-decoration: none;
	letter-spacing: 0.03em;
	@include transition();

	&:hover
	{
		background: $gold;
		color: $dark;
		border-color: $gold;
		box-shadow: 0 0 20px rgba(201,168,76,0.25);
	}
}

.nav-overlay__contacts
{
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.nav-overlay__contact
{
	font-size: 0.875rem;
	color: $textSecondary;
	text-decoration: none;
	@include transition();

	&:hover { color: $gold; }
}

.nav-overlay__contact-sep
{
	color: $darkBorder;
	font-size: 1rem;
}
</style>
