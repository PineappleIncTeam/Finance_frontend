// Компонент "Строка", пока выглядит как Список категорий, Инпут, Кнопка. Переиспользуемый
import { useState, useEffect } from "react";
import SelectElement from "./SelectElement";
// import jsonToArray from '../Utils/jsonToArray';

function MainFieldString(props) {
  const [categories, setCategories] = useState("");
  // запрос к серверу на получение категорий "Постоянные доходы". Работает. Надо получаемый JSON перевести в массив категорий. И вообще этот запрос нужен наверное в другом компоненте.
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 594ca34107d6a49c395b7af277df4e405f374b80",
      },
    };
    fetch("http://127.0.0.1:8000/api/categories/", options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories));
    console.log(options);
  }, [SelectElement]);
  console.log(categories);
  return (
    <form action="" method="post" className="main_field_string">
      {categories && (
        <SelectElement
          categories={categories}
          category_type={props.type}
          title={props.title}
        />
      )}
      <input type="text" className="main_field_string_input"></input>
      <button type="submit" className="main_field_string_button">
        Добавить
      </button>
    </form>
  );
}
export default MainFieldString;
