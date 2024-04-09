export function getStorageSum(storageCategories: any) {
	let totalSum = 0;
	if (storageCategories) storageCategories.map((item: any) => (totalSum += item.sum));
	return totalSum.toFixed(2);
}

export function getBalanceToTarget(storageCategories: any) {
	let totalSum = 0;
	let totalTarget = 0;
	let balanceToTarget = 0;
	storageCategories && storageCategories.map((item: any) => (totalSum += item.sum));
	storageCategories && storageCategories.map((item: any) => (totalTarget += item.target));
	balanceToTarget = (totalTarget - totalSum).toFixed(2);
	return balanceToTarget;
}
export function getBalanceToTargetingPercent(storageCategories: any) {
	let totalSum = 0;
	let totalTarget = 0;
	storageCategories && storageCategories.map((item: any) => (totalSum += item.sum));
	storageCategories && storageCategories.map((item: any) => (totalTarget += item.target));
	const onePercent = totalTarget / 100;
	const totalSumInPercent = (totalSum / onePercent).toFixed(2);
	const balanceToTargetInPercent = ((totalTarget - totalSum) / onePercent).toFixed(2);
	const result = [totalSumInPercent, balanceToTargetInPercent];
	return result;
}
