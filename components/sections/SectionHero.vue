<script setup>
	import { gsap } from '~/composables/useGsap';

	const heroRef = ref(null);
	const canvasRef = ref(null);

	function scrollToApplication()
	{
		document.querySelector('#application')?.scrollIntoView({ behavior: 'smooth' });
	}

	function scrollToAbout()
	{
		document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
	}

	// ── Particle canvas ─────────────────────────────────────────────
	function initCanvas()
	{
		const canvas = canvasRef.value;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		let W = canvas.width = window.innerWidth;
		let H = canvas.height = window.innerHeight;
		let raf;

		const particles = Array.from({ length: 80 }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			r: Math.random() * 1.5 + 0.3,
			vx: (Math.random() - 0.5) * 0.25,
			vy: (Math.random() - 0.5) * 0.25,
			alpha: Math.random() * 0.5 + 0.1,
		}));

		function draw()
		{
			ctx.clearRect(0, 0, W, H);

			// сетка
			ctx.strokeStyle = 'rgba(201,168,76,0.08)';
			ctx.lineWidth = 0.5;
			for (let x = 0; x < W; x += 80)
			{
				ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
			}
			for (let y = 0; y < H; y += 80)
			{
				ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
			}

			// диагонали
			ctx.strokeStyle = 'rgba(201,168,76,0.04)';
			for (let i = -H; i < W; i += 120)
			{
				ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
				ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - H, H); ctx.stroke();
			}

			// частицы
			for (const p of particles)
			{
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = W;
				if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H;
				if (p.y > H) p.y = 0;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
				ctx.fill();
			}

			// связи
			ctx.lineWidth = 0.4;
			for (let i = 0; i < particles.length; i++)
			{
				for (let j = i + 1; j < particles.length; j++)
				{
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const d = Math.sqrt(dx * dx + dy * dy);
					if (d < 120)
					{
						ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 120)})`;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			raf = requestAnimationFrame(draw);
		}

		draw();

		const onResize = () =>
		{
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', onResize);

		return () =>
		{
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
		};
	}

	// ── Entrance animation ──────────────────────────────────────────
	let cleanup;

	onMounted(() =>
	{
		cleanup = initCanvas();

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// сбрасываем в invisible
		gsap.set('.hero__badge', { autoAlpha: 0, y: 30 });
		gsap.set('.hero__title-line', { autoAlpha: 0, y: 60 });
		gsap.set('.hero__subtitle', { autoAlpha: 0, y: 30 });
		gsap.set('.hero__actions', { autoAlpha: 0, y: 30 });
		gsap.set('.hero__stats', { autoAlpha: 0, y: 20 });
		gsap.set('.hero__scroll-hint', { autoAlpha: 0 });
		gsap.set('.hero__visual', { autoAlpha: 0, scale: 0.92 });

		tl
			.to('.hero__badge', { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
			.to('.hero__title-line', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.55)
			.to('.hero__subtitle', { autoAlpha: 1, y: 0, duration: 0.7 }, 1.0)
			.to('.hero__actions', { autoAlpha: 1, y: 0, duration: 0.7 }, 1.2)
			.to('.hero__stats', { autoAlpha: 1, y: 0, duration: 0.7 }, 1.4)
			.to('.hero__visual', { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.4)
			.to('.hero__scroll-hint', { autoAlpha: 1, duration: 0.6 }, 1.8);

		// parallax на скролл
		gsap.to('.hero__content', {
			y: -80,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			},
		});

		// плавающий орнамент
		gsap.to('.hero__orb', {
			y: -20,
			duration: 3,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
		});
	});

	onUnmounted(() =>
	{
		cleanup?.();
	});
</script>

<template>
	<section class="hero" ref="heroRef">
		<canvas ref="canvasRef" class="hero__canvas" aria-hidden="true" />

		<div class="hero__glow hero__glow--left" aria-hidden="true" />
		<div class="hero__glow hero__glow--right" aria-hidden="true" />

		<div class="container hero__inner">
			<!-- Левая колонка — текст -->
			<div class="hero__content">
				<div class="hero__badge">
					<span class="hero__badge-dot" />
					Закрытое бизнес-сообщество
				</div>

				<h1 class="hero__title">
					<span class="hero__title-line">Union</span>
					<span class="hero__title-line hero__title-line--gold">Consulting</span>
					<span class="hero__title-line">Group</span>
				</h1>

				<p class="hero__subtitle">
					Консалтинг и закрытое сообщество для предпринимателей.<br>
					Экосистема для масштабирования личности и бизнеса.
				</p>

				<div class="hero__actions">
					<button class="hero__btn hero__btn--primary" @click="scrollToApplication">
						<span>Оставить заявку</span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</button>
					<button class="hero__btn hero__btn--outline" @click="scrollToAbout">
						Узнать больше
					</button>
				</div>

				<div class="hero__stats">
					<div class="hero__stat">
						<span class="hero__stat-value">5</span>
						<span class="hero__stat-label">уровней членства</span>
					</div>
					<div class="hero__stat-sep" />
					<div class="hero__stat">
						<span class="hero__stat-value">17+</span>
						<span class="hero__stat-label">программ обучения</span>
					</div>
					<div class="hero__stat-sep" />
					<div class="hero__stat">
						<span class="hero__stat-value">NDA</span>
						<span class="hero__stat-label">конфиденциальность</span>
					</div>
				</div>
			</div>

			<!-- Правая колонка — визуал -->
			<div class="hero__visual" aria-hidden="true">
				<div class="hero__orb-wrap">
					<div class="hero__orb">
						<div class="hero__orb-ring hero__orb-ring--1" />
						<div class="hero__orb-ring hero__orb-ring--2" />
						<div class="hero__orb-ring hero__orb-ring--3" />
						<div class="hero__orb-core">
							<span>UNION</span>
						</div>
					</div>

					<div class="hero__orbit-labels">
						<div class="hero__orbit-label hero__orbit-label--1">FOUNDER</div>
						<div class="hero__orbit-label hero__orbit-label--2">PREMIER</div>
						<div class="hero__orbit-label hero__orbit-label--3">BUSINESS</div>
						<div class="hero__orbit-label hero__orbit-label--4">START</div>
					</div>
				</div>
			</div>
		</div>

		<div class="hero__scroll-hint" @click="scrollToAbout">
			<span class="hero__scroll-text">Прокрутите вниз</span>
			<div class="hero__scroll-line" />
		</div>
	</section>
</template>

<style lang="scss">
.hero
{
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	overflow: hidden;
	background: $dark;
}

// Canvas background
.hero__canvas
{
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 0;
}

// Glow spots
.hero__glow
{
	position: absolute;
	width: 600px;
	height: 600px;
	border-radius: 50%;
	pointer-events: none;
	z-index: 0;
	filter: blur(120px);

	&--left
	{
		left: -200px;
		top: -100px;
		background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
	}

	&--right
	{
		right: -100px;
		bottom: -100px;
		background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
	}
}

// Layout
.hero__inner
{
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 60px;
	align-items: center;
	padding-top: 120px;
	padding-bottom: 80px;
	min-height: 100vh;

	@include mq(0, 900) { grid-template-columns: 1fr; }
}

// Content
.hero__content { max-width: 580px; }

.hero__badge
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 32px;
	padding: 8px 18px;
	border: 1px solid rgba(201,168,76,0.3);
	border-radius: 100px;
	font-size: 0.8125rem;
	font-weight: 500;
	letter-spacing: 0.08em;
	color: $gold;
	background: rgba(201,168,76,0.06);
	backdrop-filter: blur(8px);
}

.hero__badge-dot
{
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: $gold;
	box-shadow: 0 0 8px $gold;
	animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot
{
	0%, 100% { box-shadow: 0 0 4px $gold; opacity: 1; }
	50% { box-shadow: 0 0 12px $gold; opacity: 0.6; }
}

.hero__title
{
	display: flex;
	flex-direction: column;
	margin-bottom: 28px;
	line-height: 1.02;
	letter-spacing: -0.03em;
}

.hero__title-line
{
	display: block;
	font-size: clamp(3.5rem, 7vw, 6rem);
	font-weight: 900;
	color: $textPrimary;

	&--gold { color: $gold; }
}

.hero__subtitle
{
	margin-bottom: 44px;
	font-size: clamp(1rem, 2vw, 1.1875rem);
	color: $textSecondary;
	line-height: 1.7;
}

.hero__actions
{
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	margin-bottom: 56px;
}

.hero__btn
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 16px 32px;
	border-radius: 10px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	@include transition();

	&--primary
	{
		background: $gold;
		color: $dark;
		border: 2px solid $gold;
		box-shadow: 0 0 0 0 rgba(201,168,76,0.4);

		&:hover
		{
			background: $goldLight;
			border-color: $goldLight;
			box-shadow: 0 0 24px rgba(201,168,76,0.35);
			transform: translateY(-1px);
		}
	}

	&--outline
	{
		background: transparent;
		color: $textPrimary;
		border: 2px solid rgba(255,255,255,0.12);

		&:hover
		{
			border-color: $gold;
			color: $gold;
			transform: translateY(-1px);
		}
	}
}

.hero__stats
{
	display: flex;
	align-items: center;
	gap: 28px;
	flex-wrap: wrap;
}

.hero__stat
{
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.hero__stat-value
{
	font-size: 2rem;
	font-weight: 800;
	color: $gold;
	line-height: 1;
	letter-spacing: -0.02em;
}

.hero__stat-label
{
	font-size: 0.75rem;
	color: $textSecondary;
	letter-spacing: 0.02em;
}

.hero__stat-sep
{
	width: 1px;
	height: 36px;
	background: rgba(255,255,255,0.1);

	@include mq(0, 480) { display: none; }
}

// Visual (orb)
.hero__visual
{
	display: flex;
	align-items: center;
	justify-content: center;

	@include mq(0, 900) { display: none; }
}

.hero__orb-wrap
{
	position: relative;
	width: 420px;
	height: 420px;
}

.hero__orb
{
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.hero__orb-ring
{
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(201,168,76,0.2);

	&--1
	{
		width: 420px;
		height: 420px;
		animation: rotate-ring 18s linear infinite;
		border-style: dashed;
	}

	&--2
	{
		width: 300px;
		height: 300px;
		animation: rotate-ring 12s linear infinite reverse;
		border-color: rgba(201,168,76,0.3);
	}

	&--3
	{
		width: 180px;
		height: 180px;
		animation: rotate-ring 8s linear infinite;
		border-color: rgba(201,168,76,0.4);
		background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
	}
}

@keyframes rotate-ring
{
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

.hero__orb-core
{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background: radial-gradient(circle at 40% 35%, rgba(232,201,122,0.5) 0%, rgba(201,168,76,0.15) 60%, transparent 100%);
	border: 1px solid rgba(201,168,76,0.5);
	box-shadow:
		0 0 30px rgba(201,168,76,0.15),
		0 0 80px rgba(201,168,76,0.08),
		inset 0 1px 1px rgba(255,255,255,0.15);
	display: flex;
	align-items: center;
	justify-content: center;

	span
	{
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		color: $gold;
	}
}

.hero__orbit-labels { position: absolute; inset: 0; }

.hero__orbit-label
{
	position: absolute;
	padding: 5px 12px;
	border: 1px solid rgba(201,168,76,0.35);
	border-radius: 100px;
	font-size: 0.6875rem;
	font-weight: 700;
	letter-spacing: 0.12em;
	color: $gold;
	background: rgba(13,27,46,0.85);
	backdrop-filter: blur(6px);
	white-space: nowrap;

	&--1 { top: 10px; left: 50%; transform: translateX(-50%); }
	&--2 { top: 50%; right: -10px; transform: translateY(-50%); }
	&--3 { bottom: 40px; left: 50%; transform: translateX(-50%); }
	&--4 { top: 50%; left: -10px; transform: translateY(-50%); }
}

// Scroll hint
.hero__scroll-hint
{
	position: absolute;
	bottom: 36px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	z-index: 2;
}

.hero__scroll-text
{
	font-size: 0.6875rem;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $textSecondary;
}

.hero__scroll-line
{
	width: 1px;
	height: 48px;
	background: linear-gradient(to bottom, $gold, transparent);
	animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line
{
	0% { transform: scaleY(0); transform-origin: top; }
	50% { transform: scaleY(1); transform-origin: top; }
	51% { transform: scaleY(1); transform-origin: bottom; }
	100% { transform: scaleY(0); transform-origin: bottom; }
}
</style>
