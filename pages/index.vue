<script setup>
	const runtimeConfig = useRuntimeConfig();
	const { siteUrl, siteName, contactPhoneSchema } = usePublicSite();
	const pageUrl = `${siteUrl}/`;
	const title = `${siteName} — Закрытое бизнес-сообщество`;
	const description = 'Закрытое бизнес-сообщество и консалтинг для предпринимателей. Экосистема для масштабирования личности и бизнеса.';
	const image = `${siteUrl}/android-chrome-512x512.png`;
	const buildTime = runtimeConfig.public.buildTime || '';

	useSeoMeta({
		title,
		description,
		ogTitle        : title,
		ogDescription  : description,
		ogType         : 'website',
		ogUrl          : pageUrl,
		ogImage        : image,
		ogImageWidth   : 512,
		ogImageHeight  : 512,
		twitterCard    : 'summary_large_image',
		twitterTitle   : title,
		twitterDescription: description,
		twitterImage   : image,
	});

	const schemaGraph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${siteUrl}/#organization`,
				name: siteName,
				url: siteUrl,
				logo: `${siteUrl}/favicon.svg`,
				image: image,
				slogan: 'Экосистема для масштабирования личности и бизнеса',
				telephone: contactPhoneSchema,
				contactPoint: [
					{
						'@type': 'ContactPoint',
						telephone: contactPhoneSchema,
						contactType: 'customer support',
						areaServed: 'RU',
						availableLanguage: ['ru'],
					},
				],
			},
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: siteName,
				inLanguage: 'ru-RU',
				publisher: {
					'@id': `${siteUrl}/#organization`,
				},
			},
			{
				'@type': 'WebPage',
				'@id': `${pageUrl}#webpage`,
				url: pageUrl,
				name: title,
				description: description,
				inLanguage: 'ru-RU',
				isPartOf: {
					'@id': `${siteUrl}/#website`,
				},
				about: {
					'@id': `${siteUrl}/#service`,
				},
				...(buildTime ? { dateModified: buildTime } : {}),
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: image,
				},
			},
			{
				'@type': 'Service',
				'@id': `${siteUrl}/#service`,
				name: 'Консалтинг и закрытое бизнес-сообщество UNION',
				provider: {
					'@id': `${siteUrl}/#organization`,
				},
				serviceType: [
					'Бизнес-консалтинг',
					'Образовательные программы для предпринимателей',
					'Закрытое бизнес-сообщество',
				],
				areaServed: {
					'@type': 'Country',
					name: 'Russia',
				},
				availableChannel: {
					'@type': 'ServiceChannel',
					serviceUrl: pageUrl,
				},
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Уровни участия UNION',
					itemListElement: [
						{
							'@type': 'Offer',
							name: 'START',
							description: 'Фундамент: образование, групповой консалтинг, нетворкинг.',
							price: '15000',
							priceCurrency: 'RUB',
						},
						{
							'@type': 'Offer',
							name: 'BUSINESS',
							description: 'Масштабирование: персональный консалтинг, совет директоров, бизнес-экскурсии.',
							price: '45000',
							priceCurrency: 'RUB',
						},
						{
							'@type': 'Offer',
							name: 'PREMIER',
							description: 'Влияние: закрытые форматы, стратегические сессии и расширенный доступ.',
						},
						{
							'@type': 'Offer',
							name: 'FOUNDER',
							description: 'Глубокая личная и командная трансформация с персональным сопровождением.',
						},
					],
				},
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#sections`,
				name: 'Разделы главной страницы',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Hero', url: `${pageUrl}#hero` },
					{ '@type': 'ListItem', position: 2, name: 'О нас', url: `${pageUrl}#about` },
					{ '@type': 'ListItem', position: 3, name: 'Кодекс этики', url: `${pageUrl}#ethics` },
					{ '@type': 'ListItem', position: 4, name: 'Уровни членства', url: `${pageUrl}#levels` },
					{ '@type': 'ListItem', position: 5, name: 'Пакеты участия', url: `${pageUrl}#membership` },
					{ '@type': 'ListItem', position: 6, name: 'Каталог обучений', url: `${pageUrl}#catalog` },
					{ '@type': 'ListItem', position: 7, name: 'Проекты сообщества', url: `${pageUrl}#projects` },
					{ '@type': 'ListItem', position: 8, name: 'Воронка отбора', url: `${pageUrl}#funnel` },
					{ '@type': 'ListItem', position: 9, name: 'Безопасность', url: `${pageUrl}#security` },
					{ '@type': 'ListItem', position: 10, name: 'Форма заявки', url: `${pageUrl}#application` },
				],
			},
		],
	};

	useHead({
		link: [
			{ rel: 'canonical', href: pageUrl },
		],
		script: [
			{
				key: 'structured-data',
				type: 'application/ld+json',
				children: JSON.stringify(schemaGraph),
			},
		],
	});
</script>

<template>
	<div class="index-page">
		<SectionsSectionHero />
		<SectionsSectionAbout />
		<SectionsSectionAccent />
		<SectionsSectionEthics />
		<SectionsSectionLevels />
		<SectionsSectionMembership />
		<SectionsSectionCatalog />
		<SectionsSectionProjects />
		<SectionsSectionFunnel />
		<SectionsSectionSecurity />
		<SectionsSectionApplication />
	</div>
</template>

<style lang='scss'>
.index-page { background: $dark; }
</style>
