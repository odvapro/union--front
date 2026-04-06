# Оглавление

0. [Минимальные требования перед запуском проекта](#Минимальные-требования-перед-запуском-проекта)
1. [Используемый стек](#Используемый-стек)
2. [Code style](#Code-style)
3. [Структура проекта](#Структура-проекта)
4. [Работа с API](#Работа-с-API)
5. [Работа с формами](#Работа-с-формами)
6. [Комментирование кода](#Комментирование-кода)
7. [Команды](#Команды)
8. [Рекомендации](#Рекомендации)

# Минимальные требования перед запуском проекта
Ознакомиться с [используемым стеком](#Используемый-стек), хотя бы частично.
Установить **Node.js** 20.x или новее (рекомендуется актуальный LTS; для Nuxt 4 официально ожидается Node ^20.19 или ^22.12+).
Установить **npm** 10+ (или совместимый pnpm/yarn, если команда договорится об этом в проекте).

Скопировать переменные окружения: `cp .env.example .env` и при необходимости задать `NUXT_PUBLIC_SITE_URL`, контакты и прочие `NUXT_PUBLIC_*` из `.env.example`.

# Используемый стек
- Фреймворк — [Nuxt 4](https://nuxt.com/docs/getting-started/introduction) (Vue 3, file-based routing, Nitro)
- Состояние — [Pinia](https://pinia.vuejs.org/) + [@pinia/nuxt](https://nuxt.com/modules/pinia)
- Утилиты для Vue — [@vueuse/nuxt](https://vueuse.org/) (в т.ч. композиции для DOM)
- Стили — **SCSS** (глобальные переменные и миксины в `assets/styles`, вёрстка компонентов по **БЭМ**), без Tailwind
- Анимации — [GSAP](https://gsap.com/) (+ ScrollTrigger через проектный `useGsap`)
- Маска ввода — [maska](https://beholdr.github.io/maska/v3/)
- Уведомления — [vue-toast-notification](https://www.npmjs.com/package/vue-toast-notification)
- Тесты — [Vitest](https://vitest.dev/)

Отдельно: SEO-мета и JSON-LD на главной, динамические маршруты Nitro для `/sitemap.xml` и `/site.webmanifest`, публичные настройки через `NUXT_PUBLIC_*` (см. `.env.example`).

# Code style
По всей компании придерживаемся стиля [Allman](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) для размещения фигурных скобок.

## Стиль Allman
В стиле Allman открывающая фигурная скобка размещается на новой строке, выровненная с началом управляющей структуры.
**Важно**: Избегаем фигурные скобки, если внутри только одна строка кода (касается if, for, while и других конструкций).

### Примеры JavaScript:
```javascript
// Функции
function calculateTotal(items)
{
	let total = 0;
	for (let i = 0; i < items.length; i++)
		total += items[i].price;

	return total;
}

function validateUser(user)
{
	if (!user.email)
		throw new Error('Email is required');

	return true;
}

// Условные операторы
if (user.isAuthenticated)
{
	console.log('Пользователь авторизован');
	if (user.hasPermission('admin'))
		showAdminPanel();
}
else
	redirectToLogin();

// Циклы
for (let i = 0; i < array.length; i++)
{
	if (array[i].isValid)
		processItem(array[i]);
}

// Дополнительные примеры без фигурных скобок
while (condition)
	doSomething();

// Объекты и классы
const userConfig =
{
	name: 'John Doe',
	email: 'john@example.com',
	settings:
	{
		theme: 'dark',
		notifications: true
	}
};
```

## Нэйминг в файловой структуре

### Именование папок и файлов
- **Папки** → kebab-case (например: `user-profile/`, `news-list/`)
- **Файлы (кроме компонентов)** → kebab-case (например: `user-service.js`, `api-utils.js`)
- **Компоненты** → PascalCase (например: `UserCard.vue`, `NewsList.vue`)

### Именование в коде
- Формат названий функций и переменных - **camelCase**
- Формат названий констант - **SCREAM_CASE**
- Формат названий CSS селекторов - [БЭМ](https://ru.bem.info/methodology/css/)

## Табуляция и отступы
- **Используем табуляцию табами** - размер 4 пробела
- **Консистентность отступов** - все файлы должны использовать одинаковые отступы
- **Настройка редактора** - смотреть файл `.editorconfig` для VSCode в `./.vscode/settings.json` для того чтобы редактор не подставлял что-то другое
- Внутри тегов `<script>`, `<template>` и `<style>` весь код должен быть отступлен на один таб от начала строки
- Это обеспечивает четкую визуальную иерархию и улучшает читаемость кода

### Пример правильных отступов:
> **Примечание**: В примере ниже используются настоящие табы размером в 4 пробела

```vue
<template>
	<div class="user-card">
		<div class="user-card__header">
			<img class="user-card__avatar" src="avatar.jpg" alt="Avatar">
			<h2 class="user-card__title">Иван Иванов</h2>
		</div>
		<div class="user-card__content">
			<p>Описание пользователя...</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserCard',
		props:
		{
			user:
			{
				type: Object,
				required: true
			}
		},
		computed:
		{
			fullName()
			{
				return `${this.user.firstName} ${this.user.lastName}`
			}
		}
	}
</script>

<style scoped>
	.user-card
	{
		padding: 20px;
		border: 1px solid #ccc;
	}
	.user-card__header
	{
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}
</style>
```

### BEM - именование в классов и стилей
- **Используем наименование по BEM** - block__element--modifier
- **Избегаем `&` в стилях** с целью увеличения читаемости и удобства поиска нужных классов
- **Стандартные теги внутри BEM элементов** - можно иногда пропускать установку им классов и напрямую указывать стили для этих элементов (но не глобально)
- **Классы в HTML компонента** - только по БЭМ либо глобальные классы с префиксом `g-`
- **Именование компонентов** - если компонент в папке `components/Blog/Card.vue`, то именовать надо `blog-card`, а подключение `<BlogCard />`

#### Примеры BEM:
```scss
// Блок
.user-card {
	padding: 20px;
	border: 1px solid #ccc;
}

// Элементы
.user-card__header {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.user-card__avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

// Модификаторы
.user-card--featured {
	border-color: #007bff;
	background-color: #f8f9fa;
}

.user-card--featured .user-card__title {
	color: #007bff;
}

// Глобальные классы с префиксом g- эти стили писать не в компонентах конечно
.g-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
}

.g-button {
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
```

```vue
<template>
	<div class="user-card user-card--featured">
		<div class="user-card__header">
			<img class="user-card__avatar" src="avatar.jpg" alt="Avatar">
			<h2 class="user-card__title">Иван Иванов</h2>
		</div>
		<div class="user-card__content">
			<p>Описание пользователя...</p>
			<!-- Стандартные теги без классов -->
			<h3>Дополнительная информация</h3>
			<p>Еще один параграф</p>
		</div>
	</div>
</template>
```

# Структура проекта
В этом разделе будет подробно (по возможности) описана структура проекта, чтобы не возникало вопросов, что, где и почему
Общая структура проекта будет выглядеть следующим образом:
```
Корень проекта /
| - api
| - assets
| - components
| - composables
| - layouts
| - pages
| - plugins
| - public
| - server
|   |- routes/          # Nitro: например sitemap.xml, site.webmanifest
| - utils
| - assets/
|   |- fonts/
|   |- styles/
|        |- base/       # _variables.scss, _mixins.scss, _global.scss, _fonts.scss
|        |- index.scss
```

Дальше разберем каждую по отдельности

## 📁 /api
В данной директории будут находиться функции-запросы, разделенные по модулям, т.е. модуль авторизации (auth.js),
модуль работы с пользователем (user.js) и т.д.

Это поможет нам скомпоновать идентичные запросы в одном месте и избавит нас от дублирования одинаковых запросов.

❗Исключением является запрос, который существует конкретно на одной странице и в одном месте, тогда
создание модуля избыточно.

## 📁 /assets
В данной директории будут находиться стили, которые доступны всему проекту

### 📁 /fonts
Тут должны быть ваши шрифты

### 📁 /styles
```
styles/
|
|- base/
|  |- _fonts.scss     // Ваши шрифты
|  |- _global.scss    // Возможно повторяющиеся стили по всему проекту
|  |- _mixins.scss    // Миксины для упрощения вашей жизни
|  |- _variables.scss // SCSS переменные
|
- index.scss // Главный SCSS файл
```

## 📁 /components
В данной директории находятся все переиспользуемые компоненты приложения. Рекомендуется группировать компоненты по функциональности в отдельные папки (например: `components/User/`, `components/News/`, `components/Forms/`). Это улучшает навигацию по коду и упрощает поддержку проекта. Каждая папка может содержать основной компонент и связанные с ним подкомпоненты.

### Правила написания компонентов
- **Название компонентов**: используем PascalCase (например: `UserCard.vue`, `NewsList.vue`)
- **Язык**: пока что избегаем TypeScript, пишем на JavaScript
- **Работа с DOM**: избегаем прямого обращения к DOM элементам
- **Подход**: работаем через стандартные методы Vue и работу через Virtual DOM

### 📁 /ui
Переиспользуемые UI-компоненты общего назначения (кнопка, диалог подтверждения и т.д.), оформленные в стиле проекта (SCSS + БЭМ).

### 📁 /components/sections
Секции лендинга и крупные блоки страниц (например `SectionHero.vue`), подключаются в `pages` как автокомпоненты Nuxt.

## 📁 /composables
В данной директории будут находиться все функциональные компоненты. Каждый файл обязательно должен называться с приставки `use-`.

## 📁 /pages
В данной директории будут находиться все ваши страницы.

## 📁 /plugins
В данной директории будут находиться все ваши сторонние (или кастомные) плагины.

## 📁 /public
Статика, отдаваемая с корня сайта: фавиконки, `robots.txt` и др. Часть путей (манифест) может собираться динамически через `server/routes`.

## 📁 /server
Серверная часть Nitro: API-хендлеры и файловые маршруты (например, генерация `sitemap.xml` и `site.webmanifest` из `runtimeConfig`).

## 📁 /utils
В данной директории будут находиться все служебных функции, например:
- formatPrice.js - функция для отображения цены в RU формате

## 📁 /tests
В данной директории будут храниться тесты, например:
- tests/utils/formatPrice.js - тест для утилса utils/formatPrice.js

# Работа с API
Для отправки серверных запросов используем кастомный `useRequest`, основанный на `useFetch`,
для отправки клиентских запросов используем `useClientRequest`, основанный на `$fetch`, в чем разница серверных/клиентских запросов
можно ознакомить на странице официальной документации [Nuxt](https://nuxt.com/docs/getting-started/data-fetching).

Если вкратце, то клиентские запросы - это обычные, всем нам известные запросы, которые мы использовали во `Vue 3`,
`Vue 2`, `React` и т.д., они выполняются на стороне клиента, либо при монтировании страницы, либо при взаимодействии
с пользователем. Серверные же запросы, исходя из названия выполняются еще на стороне сервера, еще до монтирования страницы,
но во время гидрации (или регидрации - это одно и тоже), сделано это для того,
чтобы у пользователя не было ситуации, где данных еще нет, ему в любом случае уже придет готовый `html`

## Пример запросов
Вы можете ознакомиться с ним открыв файл: pages/api.vue

# Комментирование кода
В каких случаях требуется комментирование кода:

- Объяснение цели или назначения определенного блока кода, если она не очевидна.
- Описание сложных алгоритмов или логики, которые могут быть сложно понятны для других разработчиков.
- Указание на предполагаемые ошибки или проблемы, которые могут возникнуть в коде.
- Описание намерений или целей разработчика при написании определенного фрагмента кода, если она не очевидна.
- Комментирование важных или критических частей кода для обеспечения понимания других разработчиков.

Пример, когда не стоит писать комментарий ❌:
```js
// Это объект, который представляет пользователя
const user = {
	name: "John Doe",
	age: 30,
	email: "john.doe@example.com"
};
```
```js
// Функция для суммирования чисел
const add = (a, b) => a + b;
```
Но если мы создали `utils`, который помогает нам с суммированием, то описываем его следующим образом:
```js
/**
 * Функция для суммирования двух чисел.
 * @param a - Первое число для суммирования.
 * @param b - Второе число для суммирования.
 * @return {number} Сумма двух чисел.
 */
const add = (a, b) => {
	return a + b;
}
```

# Работа с формами
Вы можете ознакомиться с ним открыв файл: pages/form.vue

# Работа с глобальным хранилищем
Вы можете ознакомиться с ним открыв файл: pages/pinia.vue

# Работа с Тестами
## Когда нужно писать тесты:
- Функциональные изменения или добавление новых фич.
- Для бизнес-логики: (расчёты, фильтры, сортировка, валидация форм и прочее)
- Регрессия: Если ранее работавшая функциональность неожиданно выходит из строя, то его нужно покрывать тестами
- Цепочка действий компонентов: будет полезно написать тест для последовательного выполнения цепочки действий, например: есть форма с несколькими шагами и возможными различными исходами.

## Основные методы и функции для тестов
*<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">describe</span>* <br>
Метод *<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">describe</span>* нужен для группировки связанных тестов.

*<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">test</span>* и *<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">it</span>*<br>
Метод *<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">test / it</span>* используется для создания и определения отдельного теста. Он принимает два аргумента:

- **Первый аргумент** — строка, описывающая, что именно проверяется в тесте. Это название теста, которое помогает понять, какой функционал тестируется.

- **Второй аргумент** — функция, которая содержит код, выполняющий проверку (или сам тест). В этой функции обычно используется один или несколько методов для проверки утверждений.

*<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">test</span>* и *<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">it</span>*  это практически идентичные функции,  разница только в названии. Испоьзуется в связке с *<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">describe</span>* для лучшей читаемости.

*<span style="background-color:rgb(49, 49, 49); color: red; padding: 2px; border-radius: 3px">expect</span>* <br>
- Проверять соответствие значений ожидаемому результату

- Тестировать различные условия

- Выводить понятные сообщения об ошибках

Основыные проверки:

- ```js
	.toBe() - строгое сравнение (===)
	```

- ```js
	.toEqual() - глубокое сравнение объектов
	```

- ```js
	.toBeTruthy()</span> - проверка на true
	```

- ```js
	.toBeFalsy() - проверка на false
	```

- ```js
	.toContain()</span> - проверка наличия в массиве
	```

- ```js
	.toThrow() - проверка на ошибку
	```
Настройка тестовой среды с использованием Pinia

```js
import { setActivePinia, createPinia } from 'pinia';
import { user } from '@/stores/user';

describe('User Store', () => {
	beforeEach(() => {
		// Создаем новое хранилище перед каждым тестом
		setActivePinia(createPinia());
	});
});
```

### Полезные ресурсы
- Документация vitest - https://vitest.dev/
- Гайд от накста по тестам - https://nuxt.com/docs/getting-started/testing
- Тот же гайд от накста, но на русском - https://nuxt-ru.vercel.app/docs/getting-started/testing
- Видеогайд по тестом ( на английском ) - https://www.youtube.com/watch?v=yGzwk9xi9gU

# Команды

## Установка
Обязательно установите зависимости:
```bash
npm install
```

## Запуск локальной версии
Запустите сервер разработки на `http://localhost:3000` (если не занят):
```bash
npm run dev
```

## Сборка проекта
Сборка для продакшена:
```bash
npm run build
```

Локальный предварительный просмотр сборки:
```bash
npm run preview
```

Для получения дополнительной информации ознакомьтесь с [документацией по развертыванию](https://nuxt.com/docs/getting-started/deployment).

# Используемые плагины
маска: https://beholdr.github.io/maska/v3/
нотификации: https://www.npmjs.com/package/vue-toast-notification

# Рекомендации
- Если вам нужно использовать слайдер на проекте: https://swiperjs.com/
- Если вам нужно использовать click-outside и другие приколы используйте: https://vueuse.org/
- Если вы не можете разобраться с grid сеткой: https://cssgrid-generator.netlify.app/
- Если вы не можете разобраться с flex сеткой: https://angrytools.com/css-flex/
- Если вам нужно конвертнуть фавиконку: https://favicon.io/favicon-converter/
- Если вам нужно конвертнуть шрифты: https://transfonter.org/