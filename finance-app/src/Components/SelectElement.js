// Выпадающий список категорий. будет меняться, т.к. данные о категориях должны приниматься с сервера, с привязкой к конкретному пользователю

import { useState } from "react";

function SelectElement({
  category_type,
  categories,
  title,
  changeSelectElement,
  token,
  setSelectElement,
  getInputData,
  typeForSum,
}) {
  let [newCategory, setNewCategory] = useState("");

  // Функция добавления категории работает, сервер понимает запрос. Нужно еще обработать промис и выдать категории id. Расшифровка для меня. Виталий)
  function addCategory(e) {
    e.preventDefault();
    console.log(e.target.value);
    let selectedValue = e.target.value;
    if (selectedValue === "Добавить категорию") {
      newCategory = prompt("Введите название категории");
      setNewCategory(newCategory);

      let data = {
        categoryName: newCategory,
        category_type,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      };

      fetch("http://92.255.79.239:3000/api/categories/", options);
    } else {
      if (selectedValue !== title) {
        changeSelectElement(e.target.value);
        console.log(e.target.value);
      } else if (selectedValue === title) {
        getInputData(typeForSum);
      }
    }
  }

  return (
    <select className="select_element" onChange={(e) => addCategory(e)}>
      <option className="option_list" value={title}>
        {title}
      </option>
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
      <option value="Добавить категорию">Добавить категорию</option>
    </select>
  );
}
export default SelectElement;
