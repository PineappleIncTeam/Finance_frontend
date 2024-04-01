export function getPercentForGistogramSum(array) {
	const onePercent = (array.reduce((a, b) => +a + +b, 0) / 100).toFixed(2);
	const result = array.map((item) => (item / onePercent).toFixed(2));
	return result;
}
