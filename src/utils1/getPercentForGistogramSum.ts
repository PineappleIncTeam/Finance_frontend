export function getPercentForGistogramSum(array: any) {
	const onePercent = (array.reduce((a: any, b: any) => +a + +b, 0) / 100).toFixed(2);
	const result = array.map((item: any) => (item / +onePercent).toFixed(2));
	return result;
}
