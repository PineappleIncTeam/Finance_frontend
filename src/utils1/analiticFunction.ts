export function getAnaliticGistogramSum(json: any) {
	const keys = json && json.map((item: any) => Object.keys(item));
	const result = json && json.map((_item: any, index: any) => Object.values(json[index][keys[index]]));

	let totalSum = 0;

	for (let i = 0; i < result.length; i++) {
		totalSum += result[i].reduce((a: any, b: any) => +a + +b, 0);
	}

	return totalSum.toFixed(2);
}
