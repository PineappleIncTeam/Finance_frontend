function jsonToArray(array, type) {
  
  return array.map((jsonObject, index) => {
    
    return jsonObject.categoryName;
  
})
}

export default jsonToArray;
