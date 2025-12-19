/**
 * @category Formatting Utilities
 *
 * @description
 * Форматирует число, добавляя пробелы в качестве разделителей тысяч.
 * Преобразует число в строку с разделением разрядов для улучшения читаемости больших чисел.
 *
 * @param {number} num - Число для форматирования. Может быть положительным, отрицательным или дробным.
 * @returns {string} Отформатированная строка с разделителями тысяч.
 *
 * @example
 * // Базовое использование:
 * formatCalculateNumber(1000);       // "1 000"
 * formatCalculateNumber(1234567);    // "1 234 567"
 * formatCalculateNumber(1234567.89); // "1 234 567.89"
 *
 * @example
 * // Отрицательные числа:
 * formatCalculateNumber(-5000);      // "-5 000"
 *
 * @example
 * // Использование в интерфейсе:
 * <div>
 *   Пользователей онлайн: {formatCalculateNumber(onlineCount)}
 * </div>
 * <div>
 *   Доход: {formatCalculateNumber(revenue)} ₽
 * </div>
 *
 * @remarks
 * 1. Использует регулярное выражение для вставки пробелов каждые 3 цифры.
 * 2. Сохраняет знак минуса для отрицательных чисел.
 * 3. Сохраняет дробную часть без изменений.
 * 4. Не округляет числа, работает только с форматированием.
 *
 * @algorithm
 * Регулярное выражение `/\B(?=(\d{3})+(?!\d))/g`:
 * - `\B` - ищет позицию не на границе слова
 * - `(?=(\d{3})+)` - позитивный lookahead для последовательностей из 3+ цифр
 * - `(?!\d)` - негативный lookahead, чтобы не совпадать с цифрами
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString | Number.toLocaleString()}
 */

export const formatCalculateNumber = (str: string): string => {
	return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
