export function getGistogramCategorySum(obj: any) {
	const result: any[] = [];
	const objectKeys = obj && obj.map((item: any) => Object.keys(item));

	function sum(obj: any) {
		let itemSum = 0;
		for (const key in obj) {
			itemSum += obj[key];
		}
		return itemSum;
	}
	obj.map((item: any, index: any) => {
		result.push(sum(item[objectKeys[index]]));
	});
	return result;
}
