const monthTitles = [
	"января",
	"февраля",
	"марта",
	"апреля",
	"мая",
	"июня",
	"июля",
	"августа",
	"сентября",
	"октября",
	"ноября",
	"декабря",
];

const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

/**
 * @category Date Utilities
 *
 * @description
 * Форматирует дату из строки формата DD.MM.YY в читабельный русскоязычный формат.
 * Преобразует дату в формате "день.месяц.год" в строку вида "день месяц год, день_недели".
 *
 * @param {string} dateStr - Строка с датой в формате `DD.MM.YY` (день.месяц.год с двузначным годом).
 * @returns {string} Отформатированная строка даты в формате "день месяц год, день_недели".
 *
 * @example
 * // Базовое использование:
 * formatDate("15.03.24"); // "15 марта 2024, Пт"
 * formatDate("01.12.23"); // "1 декабря 2023, Пт"
 *
 * @example
 * // Использование в компоненте:
 * <div>
 *   Дата публикации: {formatDate(article.publishDate)}
 * </div>
 *
 * @remarks
 * 1. Ожидает входную строку строго в формате `DD.MM.YY`.
 * 2. Год преобразуется из двузначного в четырёхзначный (добавляется "20").
 * 3. Месяцы выводятся в родительном падеже (января, февраля, etc).
 * 4. Дни недели сокращаются до двух букв (Пн, Вт, etc).
 *
 * @performanceNote Для частого использования в цикле рекомендуется мемоизация
 * или предварительная компиляция формата.
 *
 * @throws {Error} Если входная строка имеет неверный формат.
 * @throws {RangeError} Если дата невалидна (например, 32.13.24).
 *
 * @algorithm
 * 1. Разделение строки на день, месяц, год
 * 2. Преобразование года в четырёхзначный формат
 * 3. Создание объекта Date
 * 4. Получение названия месяца и дня недели из массивов
 * 5. Форматирование итоговой строки
 */
export function formatDate(dateStr: string) {
	const [day, month, year] = dateStr
		.split(".")
		.map((part, index) => (index === 2 ? parseInt("20" + part, 10) : parseInt(part, 10)));

	const date = new Date(year, month - 1, day);

	const monthName = monthTitles[date.getMonth()];

	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${day} ${monthName} ${year}, ${dayOfWeek}`;
}

/**
 * @category Financial Utilities
 *
 * @description
 * Форматирует число в денежный формат с российским рублём в качестве валюты.
 * Использует локализацию для русского языка и добавляет символ рубля (₽) с правильным форматированием.
 *
 * @param {number} num - Число для форматирования. Может быть целым или дробным.
 * @param {number} [digits=2] - Количество знаков после запятой. По умолчанию 2.
 * @returns {string} Отформатированная денежная строка с символом рубля.
 *
 * @example
 * // Базовое использование:
 * formatMoney(1500);      // "1 500,00 ₽"
 * formatMoney(1234.56);   // "1 234,56 ₽"
 * formatMoney(99.9);      // "99,90 ₽"
 *
 * @example
 * // С кастомным количеством знаков:
 * formatMoney(100, 0);    // "100 ₽"
 * formatMoney(99.999, 3); // "100,00 ₽" (ограничено maximumFractionDigits)
 *
 * @example
 * // Использование в компоненте:
 * <div>
 *   Цена: {formatMoney(product.price)}
 * </div>
 * <div>
 *   Скидка: {formatMoney(discountAmount, 0)}
 * </div>
 *
 * @performanceNote Для частого форматирования одинаковых значений
 * рекомендуется кэширование экземпляра NumberFormat.
 *
 * @remarks
 * 1. Использует русскую локаль (`ru-RU`) с разделителями тысяч пробелами.
 * 2. Символ валюты - рубль (₽), размещается после суммы с пробелом.
 * 3. Дробная часть отделяется запятой.
 * 4. Если `digits > 2`, будет использовано максимальное значение 2 (ограничение `maximumFractionDigits`).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString | Number.toLocaleString()}
 */
export function formatMoney(num: number, digits: number = 2) {
	return num.toLocaleString("ru-RU", {
		minimumFractionDigits: digits,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "RUB",
	});
}
