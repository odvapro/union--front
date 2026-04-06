<script setup>
	import { gsap } from '~/composables/useGsap';

	const menuOpen = ref(false);
	const route = useRoute();
	const localePath = useLocalePath();
	const { siteUrl, siteHost, contactPhone, contactPhoneHref } = usePublicSite();
	const { t, locale } = useI18n();
	const switchLocalePath = useSwitchLocalePath();
	const { theme, toggleTheme } = useTheme();

	const navLinks = computed(() => [
		{ label: t('nav.about'), href: '#about', num: '01' },
		{ label: t('nav.levels'), href: '#levels', num: '02' },
		{ label: t('nav.catalog'), href: '#catalog', num: '03' },
		{ label: t('nav.projects'), href: '#projects', num: '04' },
		{ label: t('nav.application'), href: '#application', num: '05' },
	]);

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

	function onLogoClick(e)
	{
		if (route.path === localePath('/'))
		{
			e.preventDefault();
			closeMenu();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
</script>

<template>
	<header class="hdr">
		<div class="container hdr__inner">

			<!-- Logo -->
			<NuxtLink class="hdr__logo" :to="localePath('/')" @click="onLogoClick">
				<div class="hdr__logo-mark">
					<IconsIconLogoMark :width="100" :height="29" />
				</div>
			</NuxtLink>

			<!-- Desktop nav -->
			<nav class="hdr__nav">
				<div class="hdr__nav-inner">
					<a
						v-for="link in navLinks"
						:key="link.href"
						class="hdr__nav-link"
						:href="link.href"
						@click.prevent="scrollTo(link.href)"
					>
						{{ link.label }}
					</a>
				</div>
			</nav>

			<div class="hdr__trailing">
				<div class="hdr__actions">
					<div class="hdr__lang" :aria-label="t('header.switchLang')">
						<NuxtLink
							class="hdr__lang-link"
							:class="{ 'hdr__lang-link--active': locale === 'ru' }"
							:to="switchLocalePath('ru')"
						>{{ t('header.langRu') }}</NuxtLink>
						<NuxtLink
							class="hdr__lang-link"
							:class="{ 'hdr__lang-link--active': locale === 'en' }"
							:to="switchLocalePath('en')"
						>{{ t('header.langEn') }}</NuxtLink>
					</div>

					<div class="hdr__theme" :aria-label="t('header.switchTheme')">
						<button
							type="button"
							class="hdr__theme-btn"
							@click="toggleTheme"
						>
							<IconsIconSun v-if="theme === 'dark'" :size="18" />
							<IconsIconMoon v-else :size="18" />
						</button>
					</div>

					<a
						class="hdr__cta"
						href="#application"
						@click.prevent="scrollTo('#application')"
					>
						{{ t('header.cta') }}
					</a>
				</div>

				<button
					class="hdr__burger"
					:class="{ 'hdr__burger--active': menuOpen }"
					:aria-label="t('header.openMenu')"
					@click="toggleMenu"
				>
					<span class="hdr__burger-bar" />
					<span class="hdr__burger-bar" />
				</button>
			</div>
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
						{{ t('header.applyOverlay') }}
					</a>
					<div class="nav-overlay__contacts">
						<a :href="contactPhoneHref" class="nav-overlay__contact">{{ contactPhone }}</a>
						<span class="nav-overlay__contact-sep">·</span>
						<a :href="siteUrl" class="nav-overlay__contact" target="_blank">{{ siteHost }}</a>
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
	background: var(--color-header-bg);
	backdrop-filter: blur(20px) saturate(1.2);
	border-bottom: 1px solid var(--color-header-border);
	box-shadow:
		0 1px 0 rgba(255, 255, 255, 0.04) inset,
		0 8px 40px rgba(0, 0, 0, 0.18);
	@include transition();

	&::after
	{
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(var(--rgb-accent), 0.45) 50%,
			transparent 100%
		);
		pointer-events: none;
		opacity: 0.85;
	}
}

.hdr__inner
{
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: center;
	gap: 12px 20px;
	min-height: 80px;
	padding-top: 2px;
	padding-bottom: 2px;
}

// Logo
.hdr__logo
{
	display: flex;
	align-items: center;
	text-decoration: none;
	flex-shrink: 0;
	justify-self: start;
	@include transition();

	&:hover
	{
		.hdr__logo-mark { filter: brightness(1.08); }
	}
}

.hdr__logo-mark
{
	line-height: 0;
	flex-shrink: 0;
	@include transition();

	svg path
	{
		fill: $textPrimary;
	}
}

// Desktop nav (center column)
.hdr__nav
{
	display: flex;
	justify-content: center;
	justify-self: center;
	width: 100%;
	min-width: 0;

	@include mq(0, 960) { display: none; }
}

.hdr__nav-inner
{
	display: inline-flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	gap: 4px 8px;
	padding: 6px 10px;
	background: var(--color-nav-pill-bg);
	border: 1px solid var(--color-nav-pill-border);
	border-radius: 999px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08) inset;
}

.hdr__nav-link
{
	position: relative;
	padding: 8px 14px;
	border-radius: 999px;
	font-size: 0.8125rem;
	font-weight: 600;
	color: var(--color-header-nav-link);
	text-decoration: none;
	letter-spacing: 0.04em;
	@include transition();

	&:hover
	{
		color: $textPrimary;
		background: rgba(var(--rgb-accent), 0.1);
	}

	&:active
	{
		background: rgba(var(--rgb-accent), 0.16);
	}
}

.hdr__trailing
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
	justify-self: end;
}

.hdr__actions
{
	display: flex;
	align-items: center;
	gap: 12px;
}

// Language segmented control
.hdr__lang
{
	display: flex;
	align-items: stretch;
	padding: 3px;
	background: var(--color-lang-well-bg);
	border: 1px solid rgba(var(--rgb-accent), 0.18);
	border-radius: 10px;
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
}

.hdr__theme
{
	display: flex;
	align-items: center;
}

.hdr__theme-btn
{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	padding: 0;
	border: 1px solid rgba(var(--rgb-accent), 0.22);
	border-radius: 10px;
	background: var(--color-burger-hover-bg);
	color: var(--color-text);
	cursor: pointer;
	@include transition();

	&:hover
	{
		background: rgba(var(--rgb-accent), 0.12);
		border-color: rgba(var(--rgb-accent), 0.38);
		color: var(--color-accent);
	}
}

.hdr__lang-link
{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 38px;
	padding: 7px 10px;
	border-radius: 7px;
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	text-decoration: none;
	@include transition();

	&:hover
	{
		color: $textPrimary;
	}

	&--active
	{
		color: var(--color-text-on-accent);
		background: linear-gradient(165deg, $goldLight 0%, $gold 100%);
		box-shadow: 0 2px 12px rgba(var(--rgb-accent), 0.35);
	}
}

// CTA
.hdr__cta
{
	display: inline-flex;
	align-items: center;
	padding: 11px 22px;
	border-radius: 10px;
	font-size: 0.8125rem;
	font-weight: 700;
	color: var(--color-text-on-accent);
	text-decoration: none;
	letter-spacing: 0.06em;
	flex-shrink: 0;
	background: linear-gradient(165deg, $goldLight 0%, $gold 100%);
	border: 1px solid rgba(255, 255, 255, 0.12);
	box-shadow:
		0 2px 0 rgba(0, 0, 0, 0.15),
		0 8px 24px rgba(var(--rgb-accent), 0.22);
	@include transition();

	&:hover
	{
		filter: brightness(1.06);
		box-shadow:
			0 2px 0 rgba(0, 0, 0, 0.12),
			0 10px 28px rgba(var(--rgb-accent), 0.35);
		transform: translateY(-1px);
	}

	&:active
	{
		transform: translateY(0);
		filter: brightness(0.98);
	}

	@include mq(0, 960) { display: none; }
}

// Burger
.hdr__burger
{
	display: none;
	flex-direction: column;
	justify-content: center;
	gap: 6px;
	width: 44px;
	height: 44px;
	background: var(--color-burger-hover-bg);
	border: 1px solid rgba(var(--rgb-accent), 0.22);
	border-radius: 10px;
	cursor: pointer;
	padding: 0 11px;
	flex-shrink: 0;
	@include transition();

	@include mq(0, 960) { display: flex; }

	&:hover
	{
		background: rgba(var(--rgb-accent), 0.14);
		border-color: rgba(var(--rgb-accent), 0.45);
	}
}

.hdr__burger-bar
{
	display: block;
	height: 2px;
	border-radius: 1px;
	background: linear-gradient(90deg, $goldLight, $gold);
	@include transition();

	.hdr__burger--active &:nth-child(1)
	{
		transform: translateY(4px) rotate(45deg);
	}

	.hdr__burger--active &:nth-child(2)
	{
		transform: translateY(-4px) rotate(-45deg);
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
	background: var(--color-menu-backdrop);
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
	padding: 80px 0 40px;
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
	border: 1px solid rgba(var(--rgb-accent), 0.5);
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
		color: var(--color-text-on-accent);
		border-color: $gold;
		box-shadow: 0 0 20px rgba(var(--rgb-accent), 0.25);
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
