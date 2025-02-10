function generateRandomColors(numColors: number): string[] {
	const colors: string[] = [];

	const isDarkOrLightColor = (color: string): boolean => {
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);

		const average = (r + g + b) / 3;
		return average < 50 || average > 205;
	};

	while (colors.length < numColors) {
		const color =
			"#" +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, "0");
		if (!isDarkOrLightColor(color)) {
			colors.push(color);
		}
	}

	return colors;
}

export default generateRandomColors;
