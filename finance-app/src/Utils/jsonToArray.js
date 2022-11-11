


function jsonToArray(array) {
    let result = array.map((jsonObject, index) => {
      return jsonObject.categoryName;
    });
    console.log(result);
  }
  export default jsonToArray