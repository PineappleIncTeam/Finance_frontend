export function getGistogramCategorySum(obj) {
    let result = []
    let objectKeys = obj && obj.map((item) => Object.keys(item))
    
    function sum(obj) {
      let itemSum = 0
      for (let key in obj) {
        itemSum += obj[key]
      }
      return itemSum
    }
    obj.map((item, index) => {
      result.push(sum(item[objectKeys[index]]))
    })
    return result
  }