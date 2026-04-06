<script setup>
	import { vMaska } from 'maska/vue';
	import { gsap } from '~/composables/useGsap';
	const { siteUrl, siteHost, contactPhone, contactPhoneHref } = usePublicSite();
	const { t } = useI18n();
	const localePath = useLocalePath();

	const levelOptions = computed(() => [
		{ value: 'guest', label: t('application.level.guest') },
		{ value: 'start', label: t('application.level.start') },
		{ value: 'business', label: t('application.level.business') },
		{ value: 'premier', label: t('application.level.premier') },
		{ value: 'founder', label: t('application.level.founder') },
	]);

	const form = reactive({
		name: '',
		phone: '',
		level: '',
		message: '',
		agree: false,
	});

	const isLevelOpen = ref(false);
	const levelSelectRef = ref(null);
	const submitted = ref(false);
	const loading = ref(false);
	const submitError = ref('');
	const selectedLevelLabel = computed(() => levelOptions.value.find((opt) => opt.value === form.level)?.label || '');

	onMounted(() =>
	{
		gsap.fromTo('.application__text', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
			scrollTrigger: { trigger: '.application__inner', start: 'top 85%', once: true },
		});

		gsap.fromTo('.application__form-wrap', { autoAlpha: 0, y: 40 }, {
			autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
			scrollTrigger: { trigger: '.application__inner', start: 'top 85%', once: true },
		});

		document.addEventListener('click', onSelectOutsideClick);
		document.addEventListener('keydown', onEscapeDown);
	});

	onBeforeUnmount(() =>
	{
		document.removeEventListener('click', onSelectOutsideClick);
		document.removeEventListener('keydown', onEscapeDown);
	});

	function toggleLevelSelect()
	{
		isLevelOpen.value = !isLevelOpen.value;
	}

	function selectLevel(value)
	{
		form.level = value;
		isLevelOpen.value = false;
	}

	function closeLevelSelect()
	{
		isLevelOpen.value = false;
	}

	function onSelectOutsideClick(event)
	{
		if (!levelSelectRef.value || levelSelectRef.value.contains(event.target)) return;
		closeLevelSelect();
	}

	function onEscapeDown(event)
	{
		if (event.key !== 'Escape') return;
		closeLevelSelect();
	}

	async function submitForm()
	{
		if (!form.name || !form.phone || !form.level || !form.agree) return;

		submitError.value = '';
		loading.value = true;
		try
		{
			await $fetch('/api/application', {
				method: 'POST',
				body: {
					name: form.name,
					phone: form.phone,
					level: form.level,
					message: form.message,
					agree: form.agree,
				},
			});
			submitted.value = true;
		}
		catch (e)
		{
			let msg = '';
			if (e && typeof e === 'object' && 'data' in e && e.data && typeof e.data === 'object')
			{
				const d = e.data;
				msg = String(d.message || d.statusMessage || '');
			}
			submitError.value = msg || t('application.errorDefault');
		}
		finally
		{
			loading.value = false;
		}
	}
</script>

<template>
	<section id="application" class="section application">
		<div class="container">
			<div class="application__inner">
				<div class="application__text">
					<p class="application__label">{{ t('application.label') }}</p>
					<h2 class="section__title application__title">
						{{ t('application.titleLine1') }}<br>{{ t('application.titleLine2Before') }}<span class="gold-text">{{ t('application.titleGold') }}</span>
					</h2>
					<p class="section__subtitle">
						{{ t('application.subtitle') }}
					</p>

					<div class="application__contacts">
						<a class="application__contact" :href="contactPhoneHref">
							<IconsIconPhone class="g-icon-accent" />
							{{ contactPhone }}
						</a>
						<a class="application__contact" :href="siteUrl" target="_blank">
							<IconsIconGlobe class="g-icon-accent" />
							{{ siteHost }}
						</a>
					</div>
				</div>

				<div class="application__form-wrap gold-border">
					<div v-if="!submitted" class="application__form">
						<div class="application__field">
							<label class="application__label-field">{{ t('application.fieldName') }}</label>
							<input
								v-model="form.name"
								class="application__input"
								type="text"
								:placeholder="t('application.placeholderName')"
							>
						</div>

						<div class="application__field">
							<label class="application__label-field">{{ t('application.fieldPhone') }}</label>
							<input
								v-model="form.phone"
								v-maska="'+7 (###) ###-##-##'"
								class="application__input"
								type="tel"
								:placeholder="t('application.placeholderPhone')"
							>
						</div>

						<div class="application__field">
							<label class="application__label-field">{{ t('application.fieldLevel') }}</label>
							<div ref="levelSelectRef" class="application__select">
								<button
									class="application__select-button"
									type="button"
									:class="{ 'application__select-button--placeholder': !selectedLevelLabel }"
									@click="toggleLevelSelect"
								>
									<span>{{ selectedLevelLabel || t('application.selectPlaceholder') }}</span>
									<span class="application__select-arrow" :class="{ 'application__select-arrow--open': isLevelOpen }" />
								</button>
								<div v-if="isLevelOpen" class="application__select-dropdown">
									<button
										v-for="opt in levelOptions"
										:key="opt.value"
										type="button"
										class="application__select-option"
										:class="{ 'application__select-option--active': opt.value === form.level }"
										@click="selectLevel(opt.value)"
									>
										{{ opt.label }}
									</button>
								</div>
							</div>
						</div>

						<div class="application__field">
							<label class="application__label-field">{{ t('application.fieldMessage') }}</label>
							<textarea
								v-model="form.message"
								class="application__textarea"
								:placeholder="t('application.placeholderMessage')"
								rows="3"
							/>
						</div>

						<label class="application__checkbox">
							<input v-model="form.agree" type="checkbox">
							<span class="application__checkbox-mark" />
							<span class="application__checkbox-text">
								{{ t('application.checkboxBefore') }}
								<NuxtLink
									class="application__checkbox-link"
									:to="localePath('/privacy')"
									@click.stop
								>{{ t('application.checkboxPolicy') }}</NuxtLink>
							</span>
						</label>

						<p v-if="submitError" class="application__error">{{ submitError }}</p>

						<button
							class="application__submit"
							:disabled="!form.name || !form.phone || !form.level || !form.agree || loading"
							@click="submitForm"
						>
							<span v-if="!loading">{{ t('application.submit') }}</span>
							<span v-else>{{ t('application.submitting') }}</span>
						</button>
					</div>

					<div v-else class="application__success">
						<div class="application__success-icon">✓</div>
						<h3 class="application__success-title">{{ t('application.successTitle') }}</h3>
						<p class="application__success-text">
							{{ t('application.successText') }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.application
{
	background: radial-gradient(ellipse at 30% 60%, rgba(var(--rgb-accent), 0.06) 0%, transparent 50%), $dark;
}

.application__inner
{
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 80px;
	align-items: center;

	@include mq(0, 900) { grid-template-columns: 1fr; gap: 48px; }
}

.application__label
{
	display: inline-block;
	margin-bottom: 16px;
	font-size: 0.8125rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
}

.application__title { margin-bottom: 16px; }

.application__contacts
{
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 40px;
}

.application__contact
{
	width: max-content;
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 1rem;
	color: $textSecondary;
	text-decoration: none;
	@include transition();

	&:hover { color: $gold; }
}

.application__form-wrap
{
	padding: 40px;
	background: $darkCard;
}

.application__form
{
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.application__field
{
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.application__label-field
{
	font-size: 0.8125rem;
	font-weight: 600;
	color: $textSecondary;
}

.application__input,
.application__textarea
{
	padding: 14px 16px;
	background: var(--color-input-bg);
	border: 1px solid $darkBorder;
	border-radius: 8px;
	font-size: 0.9375rem;
	color: $textPrimary;
	outline: none;
	@include transition();
	font-family: $firstFont;
	resize: none;

	&::placeholder { color: var(--color-input-placeholder); }
	&:focus { border-color: $gold; background: rgba(var(--rgb-accent), 0.04); }
}

.application__select
{
	position: relative;
}

.application__select-button
{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 14px 16px;
	background: var(--color-input-bg);
	border: 1px solid $darkBorder;
	border-radius: 8px;
	font-size: 0.9375rem;
	line-height: 1.3;
	font-family: $firstFont;
	color: $textPrimary;
	cursor: pointer;
	@include transition();

	&:focus
	{
		border-color: $gold;
		background: rgba(var(--rgb-accent), 0.04);
	}
}

.application__select-button--placeholder
{
	color: var(--color-input-placeholder);
}

.application__select-arrow
{
	width: 8px;
	height: 8px;
	border-right: 1.5px solid currentColor;
	border-bottom: 1.5px solid currentColor;
	transform: rotate(45deg) translateY(-2px);
	flex-shrink: 0;
	@include transition();
}

.application__select-arrow--open
{
	transform: rotate(-135deg) translateY(2px);
}

.application__select-dropdown
{
	position: absolute;
	left: 0;
	top: calc(100% + 8px);
	z-index: 5;
	width: 100%;
	padding: 8px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	border: 1px solid var(--color-border-strong);
	border-radius: 8px;
	background: var(--color-surface-elevated);
	box-shadow: 0 14px 36px rgba(0, 0, 0, 0.25);
}

.application__select-option
{
	width: 100%;
	padding: 10px 12px;
	border: none;
	border-radius: 6px;
	background: transparent;
	font-size: 0.875rem;
	line-height: 1.35;
	font-family: $firstFont;
	color: $textPrimary;
	text-align: left;
	cursor: pointer;
	@include transition();

	&:hover { background: rgba(var(--rgb-accent), 0.10); }
}

.application__select-option--active
{
	background: rgba(var(--rgb-accent), 0.14);
	color: rgb(var(--rgb-accent));
}

.application__checkbox
{
	display: flex;
	align-items: flex-start;
	gap: 10px;
	cursor: pointer;

	input { display: none; }

	&:has(input:checked) .application__checkbox-mark
	{
		background: $gold;
		border-color: $gold;

		&::after { display: block; }
	}
}

.application__checkbox-mark
{
	width: 18px;
	height: 18px;
	border: 1px solid $darkBorder;
	border-radius: 4px;
	flex-shrink: 0;
	margin-top: 1px;
	@include transition();
	position: relative;

	&::after
	{
		content: '';
		display: none;
		position: absolute;
		left: 5px;
		top: 2px;
		width: 5px;
		height: 9px;
		border: 2px solid $dark;
		border-top: none;
		border-left: none;
		transform: rotate(45deg);
	}
}

.application__checkbox-text
{
	font-size: 0.8125rem;
	color: $textSecondary;
	line-height: 1.5;
}

.application__checkbox-link
{
	color: $gold;
	text-decoration: underline;
	text-underline-offset: 3px;
	@include transition();

	&:hover
	{
		color: $goldLight;
	}
}

.application__error
{
	margin: 0;
	font-size: 0.875rem;
	line-height: 1.45;
	color: $red;
}

.application__submit
{
	padding: 16px;
	background: $gold;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 700;
	color: $white;
	cursor: pointer;
	@include transition();

	&:hover:not(:disabled) { background: $goldLight; }

	&:disabled
	{
		opacity: 0.4;
		cursor: not-allowed;
	}
}

.application__success
{
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 20px 0;
	gap: 16px;
}

.application__success-icon
{
	width: 64px;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid $gold;
	border-radius: 50%;
	font-size: 1.5rem;
	color: $gold;
}

.application__success-title
{
	font-size: 1.5rem;
	font-weight: 700;
	color: $textPrimary;
}

.application__success-text
{
	font-size: 0.9375rem;
	color: $textSecondary;
	line-height: 1.6;
}
</style>
