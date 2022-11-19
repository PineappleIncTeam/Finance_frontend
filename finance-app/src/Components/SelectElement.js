// Выпадающий список категорий. будет меняться, т.к. данные о категориях должны приниматься с сервера, с привязкой к конкретному пользователю
import { useState } from "react";
function SelectElement({ category_type, categories, title }) {
  const [newCategory, setNewCategory] = useState("");
  //Функция добавления категории работает, сервер понимает запрос. Нужно еще обработать промис и выдать категории id. Расшифровка для меня. Виталий)
  function addCategory(e) {
    e.preventDefault();
    let selectedValue = e.target.value;
    if (selectedValue === "Добавить категорию") {
      let newCategory = prompt("Введите название категории");
      setNewCategory(newCategory);
      let data = {
        categoryName: newCategory,
        category_type,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 594ca34107d6a49c395b7af277df4e405f374b80",
        },
        body: JSON.stringify(data),
      };

      fetch("http://127.0.0.1:8000/api/categories/", options);
      console.log(options);
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
              value={jsonObject.categoryName}
              key={jsonObject.category_id}
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
