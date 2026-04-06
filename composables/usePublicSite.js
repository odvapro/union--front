const DEFAULT_SITE_URL = 'https://unionconsulting.ru';
const DEFAULT_SITE_NAME = 'Union Consulting Group';
const DEFAULT_CONTACT_PHONE = '+7 (495) 000-00-00';
const DEFAULT_CONTACT_PHONE_HREF = '+74950000000';

/**
 * Домен, имя бренда и контакты из runtimeConfig для UI и SEO.
 * Fallback совпадает с дефолтами в nuxt.config.ts.
 * @returns {{
 *   siteUrl: string,
 *   siteHost: string,
 *   siteName: string,
 *   contactPhone: string,
 *   contactPhoneHref: string,
 *   contactPhoneSchema: string
 * }}
 */
export function usePublicSite()
{
	const runtimeConfig = useRuntimeConfig();
	const rawUrl = runtimeConfig.public.siteUrl;
	const siteUrl = (typeof rawUrl === 'string' && rawUrl.trim() ? rawUrl : DEFAULT_SITE_URL).replace(/\/+$/, '');
	const siteHost = siteUrl.replace(/^https?:\/\//, '');
	const siteName = runtimeConfig.public.siteName || DEFAULT_SITE_NAME;
	const contactPhone = runtimeConfig.public.contactPhone || DEFAULT_CONTACT_PHONE;
	const contactPhoneTel = runtimeConfig.public.contactPhoneHref || DEFAULT_CONTACT_PHONE_HREF;
	const contactPhoneHref = `tel:${contactPhoneTel}`;
	const contactPhoneSchema = contactPhone.replace(/[()\s-]/g, '');

	return {
		siteUrl,
		siteHost,
		siteName,
		contactPhone,
		contactPhoneHref,
		contactPhoneSchema,
	};
}
