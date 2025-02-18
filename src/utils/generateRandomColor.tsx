function generateRandomColors(numColors: number): string[] {
	const colors: string[] = [];

	const greenFirstSymbolIndex = 3;
	const blueFirstSymbolIndex = 5;
	const blueLastSymbolIndex = 7;

	const colorCount = 3;
	const maximalDarkColorValue = 50;
	const minimalLightColorValue = 205;

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

export default generateRandomColors;
