const REVENUE_VALUES = new Set(['employee', 'under100', '100-500', '500plus']);

function trimStr(value: unknown, max: number): string
{
	if (typeof value !== 'string') return '';

	return value.trim().slice(0, max);
}

function digitsOnly(value: string): string
{
	return value.replace(/\D/g, '');
}

export default defineEventHandler(async (event) =>
{
	assertMethod(event, 'POST');

	const body = await readBody(event).catch(() => null);

	if (!body || typeof body !== 'object')
		throw createError({ statusCode: 400, statusMessage: 'Некорректное тело запроса' });

	const raw = body as Record<string, unknown>;
	const name = trimStr(raw.name, 200);
	const phoneRaw = trimStr(raw.phone, 32);
	const revenue = trimStr(raw.revenue, 32);
	const message = trimStr(raw.message, 2000);
	const agree = raw.agree === true || raw.agree === 'true';

	if (!name)
		throw createError({ statusCode: 400, statusMessage: 'Укажите имя' });

	const phoneDigits = digitsOnly(phoneRaw);
	if (phoneDigits.length < 10)
		throw createError({ statusCode: 400, statusMessage: 'Укажите корректный телефон' });

	if (!REVENUE_VALUES.has(revenue))
		throw createError({ statusCode: 400, statusMessage: 'Выберите оборот компании' });

	if (!agree)
		throw createError({ statusCode: 400, statusMessage: 'Нужно согласие на обработку данных' });

	if (import.meta.dev)
		console.info('[api/application]', { name, revenue, phoneLast4: phoneDigits.slice(-4), messageLen: message.length });

	return { ok: true };
});
