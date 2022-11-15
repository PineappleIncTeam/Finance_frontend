


function jsonToArray(array) {
  return array.map((jsonObject, index) => {
    return jsonObject.categoryName;
  });
  
}
export default jsonToArray