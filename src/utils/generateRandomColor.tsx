/**
 * @category Color Utilities
 *
 * @description
 * Генерирует массив случайных цветов в HEX-формате, исключая слишком тёмные и слишком светлые цвета.
 * Цвета проходят проверку на среднюю яркость, чтобы обеспечить хорошую читаемость на большинстве фонов.
 *
 * @param {number} numColors - Количество цветов для генерации. Должно быть положительным целым числом.
 * @returns {string[]} Массив HEX-цветов в формате `#rrggbb`.
 *
 * @example
 * // Генерация 5 случайных цветов:
 * const colors = generateRandomColors(5);
 * console.log(colors); // ['#45a8d4', '#a367c9', '#7ebd42', '#e2943a', '#d8758f']
 *
 * @example
 * // Использование в компоненте для тегов:
 * const tagColors = generateRandomColors(tags.length);
 * tags.map((tag, index) => (
 *   <Tag key={tag.id} color={tagColors[index]}>
 *     {tag.name}
 *   </Tag>
 * ));
 *
 * @remarks
 * 1. Генерирует цвета в диапазоне #000000 - #FFFFFF.
 * 2. Исключает цвета со средней яркостью:
 *    - Ниже 50 (слишком тёмные)
 *    - Выше 205 (слишком светлые)
 * 3. Средняя яркость рассчитывается как (R + G + B) / 3.
 *
 * @algorithm
 * 1. Генерация случайного HEX-цвета
 * 2. Проверка средней яркости компонентов RGB
 * 3. Если цвет проходит проверку - добавление в массив
 * 4. Повтор до достижения нужного количества цветов
 *
 * @throws {Error} Если `numColors` не является положительным целым числом.
 */

export function generateRandomColors(numColors: number): string[] {
	const colors: string[] = [];

	const greenFirstSymbolIndex = 3;
	const blueFirstSymbolIndex = 5;
	const blueLastSymbolIndex = 7;

	const colorCount = 3;
	const maximalDarkColorValue = 50;
	const minimalLightColorValue = 205;

	/**
	 * @description
	 * Проверяет, является ли цвет слишком тёмным или слишком светлым
	 * @param {string} color - HEX-цвет в формате #rrggbb
	 * @returns {boolean} true если цвет слишком тёмный или слишком светлый
	 */
	const isDarkOrLightColor = (color: string): boolean => {
		const red = parseInt(color.slice(1, greenFirstSymbolIndex), 16);
		const green = parseInt(color.slice(greenFirstSymbolIndex, blueFirstSymbolIndex), 16);
		const blue = parseInt(color.slice(blueFirstSymbolIndex, blueLastSymbolIndex), 16);

		const average = (red + green + blue) / colorCount;
		return average < maximalDarkColorValue || average > minimalLightColorValue;
	};

	const colorSalt = 16777215;
	const radixValue = 16;
	const minimalStringLength = 6;

	while (colors.length < numColors) {
		const color =
			"#" +
			Math.floor(Math.random() * colorSalt)
				.toString(radixValue)
				.padStart(minimalStringLength, "0");
		if (!isDarkOrLightColor(color)) {
			colors.push(color);
		}
	}

	return colors;
}
