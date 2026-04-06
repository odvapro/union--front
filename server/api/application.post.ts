const LEVEL_VALUES = new Set(['guest', 'start', 'business', 'premier', 'founder']);

const TELEGRAM_TEXT_MAX = 3900;

function trimStr(value: unknown, max: number): string
{
	if (typeof value !== 'string') return '';

	return value.trim().slice(0, max);
}

function digitsOnly(value: string): string
{
	return value.replace(/\D/g, '');
}

/**
 * Отправка текста в Telegram Bot API (без parse_mode — безопасно для произвольного ввода).
 */
async function sendTelegramMessage(token: string, chatId: string, text: string): Promise<void>
{
	const safeText = text.length > TELEGRAM_TEXT_MAX
		? `${text.slice(0, TELEGRAM_TEXT_MAX)}\n…`
		: text;

	const url = `https://api.telegram.org/bot${token}/sendMessage`;

	await $fetch(url, {
		method: 'POST',
		body: {
			chat_id: chatId,
			text: safeText,
		},
	});
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
	const level = trimStr(raw.level ?? raw.revenue, 32);
	const message = trimStr(raw.message, 2000);
	const agree = raw.agree === true || raw.agree === 'true';

	if (!name)
		throw createError({ statusCode: 400, statusMessage: 'Укажите имя' });

	const phoneDigits = digitsOnly(phoneRaw);
	if (phoneDigits.length < 10)
		throw createError({ statusCode: 400, statusMessage: 'Укажите корректный телефон' });

	if (!LEVEL_VALUES.has(level))
		throw createError({ statusCode: 400, statusMessage: 'Выберите желаемый уровень участия' });

	if (!agree)
		throw createError({ statusCode: 400, statusMessage: 'Нужно согласие на обработку данных' });

	if (import.meta.dev)
		console.info('[api/application]', { name, level, phoneLast4: phoneDigits.slice(-4), messageLen: message.length });

	const config = useRuntimeConfig();
	const token = typeof config.telegramBotToken === 'string' ? config.telegramBotToken.trim() : '';
	const chatId = typeof config.telegramChatId === 'string' ? config.telegramChatId.trim() : '';

	if (token && chatId)
	{
		const lines = [
			'Новая заявка с сайта',
			'',
			`Имя: ${name}`,
			`Телефон: ${phoneRaw}`,
			`Уровень (код): ${level}`,
		];

		if (message)
		{
			lines.push('');
			lines.push('Сообщение:');
			lines.push(message);
		}

		const telegramText = lines.join('\n');

		try
		{
			await sendTelegramMessage(token, chatId, telegramText);
		}
		catch (e)
		{
			console.error('[api/application] Telegram send failed', e);
		}
	}
	else if (import.meta.dev)
		console.warn('[api/application] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — уведомление не отправлено');

	return { ok: true };
});
