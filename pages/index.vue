<script setup>
	const runtimeConfig = useRuntimeConfig();
	const { siteUrl, siteName, contactPhoneSchema } = usePublicSite();
	const { t, locale } = useI18n();
	const baseSiteUrl = siteUrl.replace(/\/+$/, '');

	const pageUrl = computed(() => (locale.value === 'en' ? `${baseSiteUrl}/en` : `${baseSiteUrl}/`));

	const title = computed(() => t('seo.title', { site: siteName }));
	const description = computed(() => t('seo.description'));
	const image = computed(() => `${baseSiteUrl}/android-chrome-512x512.png`);
	const buildTime = runtimeConfig.public.buildTime || '';

	const schemaLang = computed(() => (locale.value === 'en' ? 'en-US' : 'ru-RU'));

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

	const schemaGraph = computed(() =>
	{
		const page = pageUrl.value;

		return {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Organization',
					'@id': `${baseSiteUrl}/#organization`,
					name: siteName,
					url: baseSiteUrl,
					logo: `${baseSiteUrl}/favicon.svg`,
					image: image.value,
					slogan: t('schema.slogan'),
					telephone: contactPhoneSchema,
					contactPoint: [
						{
							'@type': 'ContactPoint',
							telephone: contactPhoneSchema,
							contactType: 'customer support',
							areaServed: 'RU',
							availableLanguage: ['ru', 'en'],
						},
					],
				},
				{
					'@type': 'WebSite',
					'@id': `${baseSiteUrl}/#website`,
					url: baseSiteUrl,
					name: siteName,
					inLanguage: schemaLang.value,
					publisher: {
						'@id': `${baseSiteUrl}/#organization`,
					},
				},
				{
					'@type': 'WebPage',
					'@id': `${page}#webpage`,
					url: page,
					name: title.value,
					description: description.value,
					inLanguage: schemaLang.value,
					isPartOf: {
						'@id': `${baseSiteUrl}/#website`,
					},
					about: {
						'@id': `${baseSiteUrl}/#service`,
					},
					...(buildTime ? { dateModified: buildTime } : {}),
					primaryImageOfPage: {
						'@type': 'ImageObject',
						url: image.value,
					},
				},
				{
					'@type': 'Service',
					'@id': `${baseSiteUrl}/#service`,
					name: t('schema.serviceName'),
					provider: {
						'@id': `${baseSiteUrl}/#organization`,
					},
					serviceType: [
						t('schema.serviceType1'),
						t('schema.serviceType2'),
						t('schema.serviceType3'),
					],
					areaServed: {
						'@type': 'Country',
						name: t('schema.countryName'),
					},
					availableChannel: {
						'@type': 'ServiceChannel',
						serviceUrl: page,
					},
					hasOfferCatalog: {
						'@type': 'OfferCatalog',
						name: t('schema.offerCatalogName'),
						itemListElement: [
							{
								'@type': 'Offer',
								name: 'START',
								description: t('schema.offerStart'),
								price: '15000',
								priceCurrency: 'RUB',
							},
							{
								'@type': 'Offer',
								name: 'BUSINESS',
								description: t('schema.offerBusiness'),
								price: '45000',
								priceCurrency: 'RUB',
							},
							{
								'@type': 'Offer',
								name: 'PREMIER',
								description: t('schema.offerPremier'),
							},
							{
								'@type': 'Offer',
								name: 'FOUNDER',
								description: t('schema.offerFounder'),
							},
						],
					},
				},
				{
					'@type': 'ItemList',
					'@id': `${page}#sections`,
					name: t('schema.sectionsListName'),
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: t('schema.secHero'), url: `${page}#hero` },
						{ '@type': 'ListItem', position: 2, name: t('schema.secAbout'), url: `${page}#about` },
						{ '@type': 'ListItem', position: 3, name: t('schema.secEthics'), url: `${page}#ethics` },
						{ '@type': 'ListItem', position: 4, name: t('schema.secLevels'), url: `${page}#levels` },
						{ '@type': 'ListItem', position: 5, name: t('schema.secMembership'), url: `${page}#membership` },
						{ '@type': 'ListItem', position: 6, name: t('schema.secCatalog'), url: `${page}#catalog` },
						{ '@type': 'ListItem', position: 7, name: t('schema.secProjects'), url: `${page}#projects` },
						{ '@type': 'ListItem', position: 8, name: t('schema.secFunnel'), url: `${page}#funnel` },
						{ '@type': 'ListItem', position: 9, name: t('schema.secSecurity'), url: `${page}#security` },
						{ '@type': 'ListItem', position: 10, name: t('schema.secApplication'), url: `${page}#application` },
					],
				},
			],
		};
	});

	useHead(() => ({
		link: [
			{ rel: 'canonical', href: pageUrl.value },
		],
		script: [
			{
				key: 'structured-data',
				type: 'application/ld+json',
				children: JSON.stringify(schemaGraph.value),
			},
		],
	}));
</script>

<template>
	<div class="index-page">
		<SectionsSectionHero />
		<SectionsSectionAbout />
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
