export function getGistogramCategorySum(obj) {
	const result = [];
	const objectKeys = obj && obj.map((item) => Object.keys(item));

	function sum(obj) {
		let itemSum = 0;
		for (const key in obj) {
			itemSum += obj[key];
		}
		return itemSum;
	}
	obj.map((item, index) => {
		result.push(sum(item[objectKeys[index]]));
	});
	return result;
}
