<script setup>
	const props = defineProps({
		error: {
			type: Object,
			default: () => ({}),
		},
	});

	const { t } = useI18n();
	const localePath = useLocalePath();

	const statusCode = computed(() =>
	{
		const n = Number(props.error?.statusCode);

		return Number.isFinite(n) && n > 0 ? n : 500;
	});

	const headline = computed(() =>
	{
		if (statusCode.value === 404)
			return t('error.404');
		if (statusCode.value === 403)
			return t('error.403');

		return t('error.default');
	});

	const detail = computed(() =>
	{
		const m = props.error?.statusMessage || props.error?.message;

		if (m && String(m).trim())
			return String(m).trim();
		if (statusCode.value === 404)
			return t('error.detail404');
		if (statusCode.value === 403)
			return t('error.detail403');

		return t('error.detailDefault');
	});

	useHead(() => ({
		title: `${statusCode.value} — ${headline.value}`,
		meta: [
			{ name: 'robots', content: 'noindex, nofollow' },
		],
	}));

	const goHome = () => clearError({ redirect: localePath('/') });
</script>

<template>
	<div class="error-page">
		<div class="error-page__bg" aria-hidden="true" />
		<div class="error-page__glow error-page__glow--left" aria-hidden="true" />
		<div class="error-page__glow error-page__glow--right" aria-hidden="true" />

		<div class="container error-page__inner">
			<div class="error-page__card gold-border">
				<div class="error-page__brand">
					<div class="error-page__logo">
						<IconsIconLogoMark :width="40" :height="40" />
					</div>
					<div class="error-page__brand-text">
						<span class="error-page__brand-name">UNION</span>
						<span class="error-page__brand-sub">Consulting Group</span>
					</div>
				</div>

				<p class="error-page__label">{{ t('error.label') }}</p>

				<div class="error-page__code-wrap">
					<span class="error-page__code">{{ statusCode }}</span>
				</div>

				<h1 class="error-page__title">{{ headline }}</h1>
				<p class="error-page__desc">{{ detail }}</p>

				<div class="error-page__actions">
					<button type="button" class="error-page__btn error-page__btn--primary" @click="goHome">
						<span>{{ t('error.home') }}</span>
						<IconsIconArrow :size="16" />
					</button>
				</div>
			</div>

			<p class="error-page__footnote">
				{{ t('error.footnote') }}
			</p>
		</div>
	</div>
</template>

<style lang="scss">
	.error-page
	{
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		background: $dark;
		padding: 100px 0 48px;
	}

	.error-page__bg
	{
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(13, 27, 46, 0.95) 0%, $dark 45%, rgba(15, 32, 53, 0.9) 100%),
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 168, 76, 0.12) 0%, transparent 55%);
		pointer-events: none;
	}

	.error-page__glow
	{
		position: absolute;
		width: 420px;
		height: 420px;
		border-radius: 50%;
		filter: blur(100px);
		pointer-events: none;
		opacity: 0.9;

		&--left
		{
			left: -160px;
			top: 10%;
			background: radial-gradient(circle, rgba(201, 168, 76, 0.14) 0%, transparent 70%);
		}

		&--right
		{
			right: -120px;
			bottom: 5%;
			background: radial-gradient(circle, rgba(201, 168, 76, 0.06) 0%, transparent 70%);
		}
	}

	.error-page__inner
	{
		position: relative;
		z-index: 1;
		max-width: 520px;
	}

	.error-page__card
	{
		padding: 40px 36px 36px;
		background: $darkCard;
		text-align: center;
		@include transition();
	}

	.error-page__brand
	{
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 28px;
	}

	.error-page__logo { line-height: 0; }

	.error-page__brand-text
	{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1;
		text-align: left;
	}

	.error-page__brand-name
	{
		font-size: 1.125rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		color: $gold;
	}

	.error-page__brand-sub
	{
		font-size: 0.5625rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: $textSecondary;
		margin-top: 2px;
	}

	.error-page__label
	{
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: $gold;
		opacity: 0.85;
		margin-bottom: 12px;
	}

	.error-page__code-wrap
	{
		margin-bottom: 16px;
	}

	.error-page__code
	{
		display: inline-block;
		font-size: clamp(4rem, 14vw, 6.5rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: -0.04em;
		background: linear-gradient(135deg, $goldLight 0%, $gold 45%, rgba(201, 168, 76, 0.65) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0 0 40px rgba(201, 168, 76, 0.15);
	}

	.error-page__title
	{
		font-size: clamp(1.25rem, 4vw, 1.5rem);
		font-weight: 700;
		color: $textPrimary;
		margin-bottom: 12px;
		line-height: 1.35;
		letter-spacing: -0.02em;
	}

	.error-page__desc
	{
		font-size: 0.9375rem;
		color: $textSecondary;
		line-height: 1.65;
		margin-bottom: 32px;
	}

	.error-page__actions
	{
		display: flex;
		justify-content: center;
	}

	.error-page__btn
	{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 28px;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		font-family: $firstFont;
		@include transition();

		&--primary
		{
			background: $gold;
			color: $dark;
			border: 2px solid $gold;

			&:hover
			{
				background: $goldLight;
				border-color: $goldLight;
				box-shadow: 0 0 24px rgba(201, 168, 76, 0.35);
			}
		}
	}

	.error-page__footnote
	{
		margin-top: 28px;
		font-size: 0.8125rem;
		color: rgba(160, 168, 184, 0.55);
		text-align: center;
		line-height: 1.5;
	}
</style>
