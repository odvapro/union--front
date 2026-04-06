export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://unionconsulting.ru',
			siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Union Consulting Group',
			siteShortName: process.env.NUXT_PUBLIC_SITE_SHORT_NAME || 'Union',
			contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE || '+7 (495) 000-00-00',
			contactPhoneHref: process.env.NUXT_PUBLIC_CONTACT_PHONE_HREF || '+74950000000',
			buildTime: process.env.NUXT_PUBLIC_BUILD_TIME || '',
		},
	},
	app: {
		head: {
			htmlAttrs: {
				'data-theme': 'light',
			},
			meta: [
				{ name: 'theme-color', content: '#313131' },
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: 'any' },
				{ rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
				{ rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
		},
	},

	modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],

	i18n: {
		locales: [
			{ code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' },
			{ code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
		],
		lazy: true,
		langDir: 'locales',
		defaultLocale: 'ru',
		strategy: 'prefix_except_default',
		detectBrowserLanguage: false,
		compilation: {
			strictMessage: false,
		},
	},

	// css base configuration
	css: ['@/assets/styles/index.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
					silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
					additionalData: `@use "@/assets/styles/base/_variables.scss" as *;  @use "@/assets/styles/base/_mixins.scss" as *;`,
				},
			},
		},
	},
})
