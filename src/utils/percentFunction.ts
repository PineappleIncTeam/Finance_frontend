export function percentFunction(json: any) {
	const test = json && json.map((item: any) => Object.keys(item));
	const test2 = json && json.map((_item: any, index: any) => Object.values(json[index][test[index]]));

	const result: any = [];
	const percentResult: any = [];
	const allCategories: any = [];

	function parseJson() {
		let count = 0;
		let item = 0;
		while (count < test2[0].length) {
			for (let i = 0; i < test2.length; i++) {
				item += test2[i][count];
			}
			item /= 100;
			result.push(item);
			item = 0;
			count++;
		}
	}
	parseJson();

	function createPercentArr() {
		let count = 0;
		let percentItem = 0;
		let percentMonth = [];
		while (count < test2[0].length) {
			for (let i = 0; i < test2.length; i++) {
				percentItem = (test2[i][count] / result[count]).toFixed(2);
				percentMonth.push(percentItem);
				percentItem = 0;
			}
			percentResult.push(percentMonth);
			percentMonth = [];
			count++;
		}
	}
	createPercentArr();

	function setArrStructure() {
		let count = 0;
		let category = [];
		while (count < percentResult[0].length) {
			for (let i = 0; i < percentResult.length; i++) {
				category.push(percentResult[i][count]);
			}
			allCategories.push(category);
			category = [];
			count++;
		}
	}
	setArrStructure();

	return allCategories;
}
