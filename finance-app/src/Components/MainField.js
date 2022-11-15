// Компонент "Доходы"
import { useState, useEffect } from 'react';
import MainFieldString from './MainFieldString';
import jsonToArray from '../Utils/jsonToArray';

function MainField() {
  const [categories, setCategories] = useState('');
  const [newCategory, setNewCategory] = useState('');
  // запрос к серверу на получение категорий "Постоянные доходы". Работает. Надо получаемый JSON перевести в массив категорий. И вообще этот запрос нужен наверное в другом компоненте.
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token b2d409251374f0252dbfc1b097089f9cc5954e1e',
      },
    };
    fetch('http://127.0.0.1:8000/api/categories/', options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(jsonToArray(userCategories)));
      console.log(options)
  }, []);
  console.log(categories);

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

  const oneTime = [
    'Временные',
    'Подработка',
    'Наследство',
    'Добавить категорию',
  ];
  const permanent = [
    'Постоянные',
    'Зарплата',
    'Подработка',
    'Планируемые',
    'Добавить категорию',
  ];

  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <input className="input_rub"></input>
      {categories && <MainFieldString type={categories} />}
      <MainFieldString type={oneTime} />
    </div>
  );
}

export default MainField;
