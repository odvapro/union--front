export default defineEventHandler((event) => {
	const runtimeConfig = useRuntimeConfig();
	const requestUrl = getRequestURL(event);
	const baseUrl = runtimeConfig.public.siteUrl || requestUrl.origin;
	const currentDate = new Date().toISOString().split('T')[0];

	const normalizedBase = String(baseUrl).replace(/\/+$/, '');

	const urls = [
		{
			loc: `${normalizedBase}/`,
			changefreq: 'weekly',
			priority: '1.0',
		},
		{
			loc: `${normalizedBase}/en`,
			changefreq: 'weekly',
			priority: '1.0',
		},
	];

	const urlsXml = urls
		.map((url) => {
			return [
				'\t<url>',
				`\t\t<loc>${url.loc}</loc>`,
				`\t\t<lastmod>${currentDate}</lastmod>`,
				`\t\t<changefreq>${url.changefreq}</changefreq>`,
				`\t\t<priority>${url.priority}</priority>`,
				'\t</url>',
			].join('\n');
		})
		.join('\n');

	const sitemapXml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urlsXml,
		'</urlset>',
	].join('\n');

	setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
	setHeader(event, 'Cache-Control', 'public, max-age=3600');

	return sitemapXml;
});
