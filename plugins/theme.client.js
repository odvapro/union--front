const STORAGE_KEY = 'union-theme';

export default defineNuxtPlugin(() =>
{
	if (!import.meta.client)
		return;

	let t = localStorage.getItem(STORAGE_KEY);

	if (t !== 'light' && t !== 'dark')
		t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	document.documentElement.setAttribute('data-theme', t);
});
