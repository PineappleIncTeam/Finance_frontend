// Компонент "Строка", пока выглядит как Список категорий, Инпут, Кнопка. Переиспользуемый

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SelectElement from "./SelectElement";

// import jsonToArray from '../Utils/jsonToArray';

function MainFieldString(props) {
  const token = useSelector((state) => state.user.token);

  const [categories, setCategories] = useState("");
  const [enterSum, setEnterSum] = useState("");
  const [selectElement, setSelectElement] = useState({});

  // запрос к серверу на получение категорий "Постоянные доходы". Работает. Надо получаемый JSON перевести в массив категорий. И вообще этот запрос нужен наверное в другом компоненте.
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch("http://92.255.79.239:3000/api/categories/", options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories));
  }, [changeSelectElement]);

  function changeSelectElement(object) {
    setSelectElement(JSON.parse(object));
    console.log(JSON.parse(object));
  }

  async function sumSubmit(event) {
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

    fetch("http://92.255.79.239:3000/api/incomecash/", options)
      .then((result) => result.json())
      .then((serverResponse) => props.getInputData(props.typeForSum));
  }

  function handleInputChange(event) {
    setEnterSum(event.target.value);
  }

  return (
    <form className="main_field_string" onSubmit={sumSubmit}>
      {categories && (
        <SelectElement
          categories={categories}
          category_type={props.type}
          title={props.title}
          changeSelectElement={changeSelectElement}
          token={token}
          getInputData={props.getInputData}
          typeForSum={props.typeForSum}
        />
      )}
      <input
        type="text"
        className="main_field_string_input"
        value={enterSum}
        onChange={(event) => handleInputChange(event)}
      ></input>
      <button type="submit" className="main_field_string_button">
        Добавить
      </button>
    </form>
  );
}
export default MainFieldString;
