const STORAGE_KEY = 'union-theme';

export default defineNuxtPlugin(() =>
{
	if (!import.meta.client)
		return;

	// Отключаем браузерное восстановление скролла — иначе при перезагрузке
	// страница появляется чуть ниже верха
	history.scrollRestoration = 'manual';
	window.scrollTo(0, 0);

	let t = localStorage.getItem(STORAGE_KEY);

	if (t !== 'light' && t !== 'dark')
		t = 'light';

	document.documentElement.setAttribute('data-theme', t);
});
