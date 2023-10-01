export function getPercentFromTotalCost(totalCost, percents, callback) {
    const result = totalCost / 100 * percents
    return callback(result)
}