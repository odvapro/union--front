export default defineEventHandler((event) => {
	const runtimeConfig = useRuntimeConfig();
	const name = runtimeConfig.public.siteName || 'Union Consulting Group';
	const shortName = runtimeConfig.public.siteShortName || 'Union';

	const manifest = {
		name,
		short_name: shortName,
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		theme_color: '#313131',
		background_color: '#313131',
		display: 'standalone',
	};

	setHeader(event, 'Content-Type', 'application/manifest+json; charset=utf-8');
	setHeader(event, 'Cache-Control', 'public, max-age=3600');

	return manifest;
});
