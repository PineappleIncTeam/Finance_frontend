import { useState } from "react";
import { useSelector } from "react-redux";
import SelectElement from "./SelectElement";

function MainFieldString({
  title,
  type,
  income_outcome,
  endpoint,
  typeOfSum,
  getInputData,
  sumCash,
  typeForSum,
  getOperationList,
  getCategories,
  typeOfCategories,
  categories,
  symbol,
  getBalanceData,
}) {
  const token = useSelector((state) => state.user.token);
  const [inputDis, setInputDis] = useState(false);
  const [enterSum, setEnterSum] = useState("");
  const [selectElement, setSelectElement] = useState({});

  function changeSelectElement(object) {
    setSelectElement(JSON.parse(object));
  }

  const disInput = (selectIndex) => {
    console.log(selectIndex);
    selectIndex > 1 ? setInputDis(true) : setInputDis(false);
  };

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
      .then((result) => getInputData(sumCash))
      .then((serverResponse) => {
        getBalanceData();
        getOperationList(endpoint, symbol);
      });
    setEnterSum("");
  }

  function handleInputChange(event) {
    setEnterSum(event.target.value);
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, "");
  };

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
          disInput={disInput}
        />
      )}

      <input
        type="number"
        className="main_field_string_input"
        value={enterSum}
        onInput={(event) => changeHandler(event)}
        min="1"
        onChange={(event) => handleInputChange(event)}
        disabled={Boolean(!inputDis)}
      ></input>
      <span className="ruble_icon">₽</span>

      <button
        type="submit"
        className="main_field_string_button"
        disabled={Boolean(!inputDis)}
      >
        Добавить
      </button>
    </form>
  );
}
export default MainFieldString;
