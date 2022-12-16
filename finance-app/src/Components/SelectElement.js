// Выпадающий список категорий. будет меняться, т.к. данные о категориях должны приниматься с сервера, с привязкой к конкретному пользователю

import { useState } from "react";

function SelectElement({
  category_type,
  income_outcome,
  categories,
  title,
  changeSelectElement,
  token,
  getInputData,
  getCategories,
  typeOfCategories,
  disInput,
}) {
  let [newCategory, setNewCategory] = useState("");

  // Функция добавления категории работает, сервер понимает запрос. Нужно еще обработать промис и выдать категории id. Расшифровка для меня. Виталий)
  function addCategory(e) {
    e.preventDefault();

    disInput(e.target.selectedIndex);

    let selectedValue = e.target.value;
    if (selectedValue === "Добавить категорию") {
      newCategory = prompt("Введите название категории");
      setNewCategory(newCategory);

      let data = {
        categoryName: newCategory,
        category_type,
        income_outcome,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      };

      fetch("http://92.255.79.239:8000/api/categories/", options).then(
        (result) => {
          result.json();
          getCategories(typeOfCategories);
        }
      );
    } else {
      if (selectedValue !== title) {
        changeSelectElement(e.target.value);
      } else if (selectedValue === title) {
        getInputData();
      }
    }
  }

  return (
    <select className="select_element" onChange={(e) => addCategory(e)}>
      <option className="option_list" value={title}>
        {title}
      </option>
      <option className="option_list_add" value="Добавить категорию">Добавить категорию</option>
      {categories.map((jsonObject, index) => {
        if (jsonObject.category_type === category_type) {
          return (
            <option
              className="option_list"
              value={JSON.stringify(jsonObject)}
              key={jsonObject.category_id}
              index={index}
              object={JSON.stringify(jsonObject)}
            >
              {jsonObject.categoryName}
            </option>
          );
        }
      })}
    </select>
  );
}
export default SelectElement;
