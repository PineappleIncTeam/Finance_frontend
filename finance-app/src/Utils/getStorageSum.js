export function getStorageSum(storageCategories) {
    let totalSum = 0
    if (storageCategories) storageCategories.map((item, index) => totalSum += item.sum)
    return totalSum
}