import { useState } from "react";
import { useSelector } from "react-redux";
import SelectElement from "./SelectElement";

// import jsonToArray from '../Utils/jsonToArray';

function MainFieldString({
  title,
  type,
  income_outcome,
  endpoint,
  typeOfSum,
  getInputData,
  typeForSum,
  getOperationList,
  getCategories,
  typeOfCategories,
  categories,
  symbol,
  getBalanceData,
}) {
  const token = useSelector((state) => state.user.token);

  const [enterSum, setEnterSum] = useState("");
  const [selectElement, setSelectElement] = useState({});

  function changeSelectElement(object) {
    setSelectElement(JSON.parse(object));
  }

  function sumSubmit(event) {
    event.preventDefault();
    let data = {
      sum: enterSum,
      category_id: selectElement.category_id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    };

    fetch(typeOfSum, options)
      .then((result) => getInputData())
      .then((serverResponse) => {
        getBalanceData();
        getOperationList(endpoint, symbol);
      });
    setEnterSum("");
  }

  function handleInputChange(event) {
    setEnterSum(event.target.value);
  }

  return (
    <form className="main_field_string" onSubmit={sumSubmit}>
      {categories && (
        <SelectElement
          categories={categories}
          category_type={type}
          income_outcome={income_outcome}
          title={title}
          changeSelectElement={changeSelectElement}
          token={token}
          getInputData={getInputData}
          typeForSum={typeForSum}
          getCategories={getCategories}
          typeOfCategories={typeOfCategories}
        />
      )}

      <input
        type="number"
        className="main_field_string_input"
        value={enterSum}
        onChange={(event) => handleInputChange(event)}
      ></input>
      <span className="ruble_icon">₽</span>

      <button type="submit" className="main_field_string_button">
        Добавить
      </button>
    </form>
  );
}
export default MainFieldString;
