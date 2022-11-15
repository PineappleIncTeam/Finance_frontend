// Выпадающий список категорий. будет меняться, т.к. данные о категориях должны приниматься с сервера, с привязкой к конкретному пользователю
import { useState } from 'react';
function SelectElement(props) {
  const [newCategory, setNewCategory] = useState('');
  //Функция добавления категории работает, сервер понимает запрос. Нужно еще обработать промис и выдать категории id. Расшифровка для меня. Виталий)
  function addCategory(e) {
    e.preventDefault();
    let selectedValue = e.target.value;
    if (selectedValue === 'Добавить категорию') {
      let newCategory = prompt('Введите название категории');
      setNewCategory(newCategory)
      let data = {
        categoryName: newCategory
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token b2d409251374f0252dbfc1b097089f9cc5954e1e',
        },
        body: JSON.stringify(data),
      };

      fetch('http://127.0.0.1:8000/api/categories/', options);
      console.log(options);
    }
  }

  return (
    <select className="select_element" onChange={(e) => addCategory(e)}>
      {props.type.map((text, index) => {
        return (
          <option className="option_list" value={text} key={index}>
            {text}
          </option>
        );
      })}
      <option value="Добавить категорию">Добавить категорию</option>
    </select>
  );
}
export default SelectElement;
