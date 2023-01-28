import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateCalendar } from "../store/dataSlice";
import SelectElement from "./SelectElement";
import Dropdown from "./Dropdown/Dropdown";

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
  range,
}) {
  const token = useSelector((state) => state.user.token);
  const dataCal = useSelector((state) => state.data.data);

  const [inputDis, setInputDis] = useState(false);
  const [enterSum, setEnterSum] = useState("");
  const [selectElement, setSelectElement] = useState({});

  function changeSelectElement(object) {
    setSelectElement(object);
  }

  const disInput = () => {
    setInputDis(true);
  };
  let dataCalendar = dataCal && dataCal.split(".").reverse().join("-");

  let Data = new Date();
  let Year = Data.getFullYear();
  let Month = Data.getMonth() + 1;
  let Day = Data.getDate();
  let dataOnline = Year + "-" + Month + "-" + Day;

  function sumSubmit(event) {
    event.preventDefault();
    let data = {
      sum: enterSum,
      category_id: selectElement.category_id,
      date: dataCalendar ? dataCalendar : dataOnline,
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
        setTimeout(() => getOperationList(endpoint, symbol), 200);
      });
    setEnterSum("");
  }

  function handleInputChange(event) {
    setEnterSum(event.target.value);
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^0-9.]+/g, "");
  };

  return (
    <form className="main_field_string" onSubmit={sumSubmit}>
      {categories && (
        <Dropdown
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
        type="text"
        className="main_field_string_input"
        value={enterSum}
        onInput={(event) => changeHandler(event)}
        min="1"
        onChange={(event) => handleInputChange(event)}
        disabled={Boolean(!inputDis)}
      ></input>
      <span className="ruble_icon ruble_icon_small">₽</span>

      <button
        type="submit"
        className="main_field_string_button"
        disabled={Boolean(!inputDis)}
      >
        Добавить
      </button>
      <button
        type="submit"
        className="main_field_string_button_plus"
        disabled={Boolean(!inputDis)}
      >
        +
      </button>
    </form>
  );
}
export default MainFieldString;
