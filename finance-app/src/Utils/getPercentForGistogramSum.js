export function getPercentForGistogramSum(array) {
    let onePercent = (array.reduce((a, b) => (+a) + (+b), 0) / 100).toFixed(2)
    let result = array.map(item => (item / onePercent).toFixed(2))
    return result
}