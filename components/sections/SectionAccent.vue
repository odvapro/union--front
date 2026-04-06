<script setup>
	const { siteName, siteShortName } = usePublicSite();

	const marqueeLabel = (siteName || siteShortName || 'Union').toUpperCase();
</script>

<template>
	<section id="accent" class="section accent" aria-hidden="true">
		<div class="accent__stars" />
		<div class="accent__stars accent__stars--glow" />

		<div class="accent__marquee">
			<div class="accent__track">
				<div class="accent__segment">
					<span
						v-for="n in 10"
						:key="'a-' + n"
						class="accent__chunk"
					>{{ marqueeLabel }}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
				</div>
				<div class="accent__segment">
					<span
						v-for="n in 10"
						:key="'b-' + n"
						class="accent__chunk"
					>{{ marqueeLabel }}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
	.accent
	{
		position: relative;
		overflow: hidden;
		padding: clamp(28px, 5vw, 48px) 0;
		min-height: clamp(120px, 22vw, 200px);
		background: #070d16;
	}

	.accent__stars
	{
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-color: #070d16;
		background-image:
			radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.95) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 22% 35%, rgba(201,168,76,0.75) 50%, transparent 52%),
			radial-gradient(1px 1px at 41% 8%, rgba(255,255,255,0.85) 50%, transparent 52%),
			radial-gradient(1px 1px at 55% 62%, rgba(255,255,255,0.7) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 68% 28%, rgba(201,168,76,0.55) 50%, transparent 52%),
			radial-gradient(1px 1px at 78% 71%, rgba(255,255,255,0.9) 50%, transparent 52%),
			radial-gradient(1px 1px at 12% 78%, rgba(255,255,255,0.65) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 31% 88%, rgba(201,168,76,0.5) 50%, transparent 52%),
			radial-gradient(1px 1px at 48% 48%, rgba(255,255,255,0.55) 50%, transparent 52%),
			radial-gradient(1px 1px at 63% 91%, rgba(255,255,255,0.8) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 85% 44%, rgba(201,168,76,0.65) 50%, transparent 52%),
			radial-gradient(1px 1px at 92% 18%, rgba(255,255,255,0.75) 50%, transparent 52%),
			radial-gradient(1px 1px at 5% 52%, rgba(255,255,255,0.5) 50%, transparent 52%),
			radial-gradient(1px 1px at 18% 22%, rgba(255,255,255,0.6) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 37% 58%, rgba(201,168,76,0.45) 50%, transparent 52%),
			radial-gradient(1px 1px at 72% 8%, rgba(255,255,255,0.88) 50%, transparent 52%),
			radial-gradient(1px 1px at 88% 82%, rgba(255,255,255,0.62) 50%, transparent 52%),
			radial-gradient(1px 1px at 25% 65%, rgba(255,255,255,0.45) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 95% 55%, rgba(201,168,76,0.4) 50%, transparent 52%),
			radial-gradient(1px 1px at 52% 22%, rgba(255,255,255,0.78) 50%, transparent 52%),
			radial-gradient(1px 1px at 14% 42%, rgba(255,255,255,0.52) 50%, transparent 52%),
			radial-gradient(1px 1px at 66% 52%, rgba(255,255,255,0.68) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 44% 92%, rgba(201,168,76,0.55) 50%, transparent 52%),
			radial-gradient(1px 1px at 76% 38%, rgba(255,255,255,0.58) 50%, transparent 52%);
		background-size: 100% 100%;
		animation: accent-twinkle 5.5s ease-in-out infinite alternate;
	}

	.accent__stars--glow
	{
		opacity: 0.35;
		mix-blend-mode: screen;
		background-image:
			radial-gradient(ellipse 120% 80% at 50% 40%, rgba(201,168,76,0.12) 0%, transparent 55%),
			radial-gradient(ellipse 80% 50% at 20% 60%, rgba(30,52,81,0.35) 0%, transparent 50%);
		animation: accent-twinkle 7s ease-in-out infinite alternate-reverse;
	}

	.accent__marquee
	{
		position: relative;
		z-index: 1;
		width: 100%;
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
	}

	.accent__track
	{
		display: flex;
		width: max-content;
		will-change: transform;
		animation: accent-marquee 95s linear infinite;
	}

	.accent__segment
	{
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}

	.accent__chunk
	{
		font-family: $firstFont;
		font-size: clamp(2.75rem, 14vw, 8.5rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: transparent;
		-webkit-text-stroke: 1.5px rgba(201, 168, 76, 0.42);
		text-shadow:
			0 0 60px rgba(201, 168, 76, 0.12),
			0 0 1px rgba(255, 255, 255, 0.06);
		white-space: nowrap;
	}

	@keyframes accent-marquee
	{
		from { transform: translateX(-50%); }
		to { transform: translateX(0); }
	}

	@keyframes accent-twinkle
	{
		from { opacity: 0.72; }
		to { opacity: 1; }
	}

	@media (prefers-reduced-motion: reduce)
	{
		.accent__track { animation: none; transform: translateX(0); }
		.accent__stars { animation: none; }
		.accent__stars--glow { animation: none; }
	}
</style>
