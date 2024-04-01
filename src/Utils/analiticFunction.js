export function getAnaliticGistogramSum(json) {
    let keys = json && json.map((item) => Object.keys(item))
    let result = json && json.map((item, index) => Object.values(json[index][keys[index]]))
    let totalSum = 0
    for (let i = 0; i < result.length; i++) {
      totalSum += result[i].reduce((a, b) => ((+a) + (+b)), 0)
    }
    return totalSum.toFixed(2)
  }