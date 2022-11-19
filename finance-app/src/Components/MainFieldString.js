// Компонент "Строка", пока выглядит как Список категорий, Инпут, Кнопка. Переиспользуемый
import { useState, useEffect } from 'react';
import SelectElement from './SelectElement';
// import jsonToArray from '../Utils/jsonToArray';

function MainFieldString(props) {
  const [categories, setCategories] = useState('');
  const [enterSum, setEnterSum] = useState('');
  const [selectElement, setSelectElement] = useState({})
  // запрос к серверу на получение категорий "Постоянные доходы". Работает. Надо получаемый JSON перевести в массив категорий. И вообще этот запрос нужен наверное в другом компоненте.
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 09caf5891310daafa7646b40430defb180e2adfc',
      },
    };
    fetch('http://127.0.0.1:8000/api/categories/', options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories));
    console.log(options);
  }, []);
  console.log(categories);
 
  function changeSelectElement(object) {
    setSelectElement(JSON.parse(object))
    
  }
  console.log(selectElement.category_id)
  function sumSubmit(event) {
    event.preventDefault()
    let data = {
      'reg_sum': enterSum,
      'var_sum': 0,
      'category_id': selectElement.category_id
    }
    console.log(data)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 09caf5891310daafa7646b40430defb180e2adfc',
      },
      body: JSON.stringify(data)
    };
    fetch('http://127.0.0.1:8000/api/incomecash/', options)


  }

  function handleInputChange(event) {
    setEnterSum(event.target.value)
  }
  return (
    <form className="main_field_string"onSubmit={sumSubmit} >
      {categories && (
        <SelectElement
          categories={categories}
          category_type={props.type}
          title={props.title}
          changeSelectElement={changeSelectElement}
        />
      )}
      <input type="text" className="main_field_string_input" value={enterSum} onChange={(event) => handleInputChange(event)} ></input>
      <button type="submit" className="main_field_string_button">
        Добавить
      </button>
    </form>
  );
}
export default MainFieldString;
