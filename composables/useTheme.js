const STORAGE_KEY = 'union-theme';

/**
 * Светлая / тёмная тема: data-theme на <html>, синхронизация с localStorage.
 */
export function useTheme()
{
	const theme = useState('theme', () => 'light');

	function readDomTheme()
	{
		if (!import.meta.client)
			return 'dark';

		const v = document.documentElement.getAttribute('data-theme');

		return v === 'light' || v === 'dark' ? v : 'dark';
	}

	function setTheme(value)
	{
		if (value !== 'light' && value !== 'dark')
			return;

		if (import.meta.client)
		{
			document.documentElement.setAttribute('data-theme', value);
			localStorage.setItem(STORAGE_KEY, value);
		}

		theme.value = value;
	}

	function toggleTheme()
	{
		setTheme(theme.value === 'dark' ? 'light' : 'dark');
	}

	onMounted(() =>
	{
		theme.value = readDomTheme();
	});

	return {
		theme,
		setTheme,
		toggleTheme,
	};
}
