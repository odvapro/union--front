import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client)
	gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal-анимация при появлении в viewport.
 * Вызывается в onMounted.
 *
 * @param {string|Element} targets — CSS-селектор или ref
 * @param {object} options
 * @param {object} options.from — fromVars для gsap.from
 * @param {object} options.scrollTrigger — доп. опции ScrollTrigger
 * @param {boolean} options.stagger — анимировать поочерёдно
 * @returns {Function} cleanup — вызвать в onUnmounted
 */
export function useGsapReveal(targets, options = {})
{
	const {
		from = { opacity: 0, y: 50 },
		to = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
		stagger = 0,
		scrollTrigger: stOptions = {},
	} = options;

	if (!import.meta.client) return () => {};

	const trigger = typeof targets === 'string'
		? document.querySelector(targets)
		: targets instanceof Element
			? targets
			: targets?.value;

	const anim = gsap.fromTo(
		typeof targets === 'string' ? targets : targets,
		{ ...from },
		{
			...to,
			...(stagger ? { stagger } : {}),
			scrollTrigger: {
				trigger: typeof targets === 'string' ? targets : targets,
				start: 'top 85%',
				once: true,
				...stOptions,
			},
		},
	);

	return () =>
	{
		if (anim.scrollTrigger) anim.scrollTrigger.kill();
		anim.kill();
	};
}

/**
 * Горизонтальная reveal-анимация (слева или справа).
 */
export function useGsapRevealX(targets, options = {})
{
	const {
		direction = 'left',
		stagger = 0,
		scrollTrigger: stOptions = {},
	} = options;

	const x = direction === 'left' ? -60 : 60;

	return useGsapReveal(targets, {
		from: { opacity: 0, x },
		to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
		stagger,
		scrollTrigger: stOptions,
	});
}

export { gsap, ScrollTrigger };
