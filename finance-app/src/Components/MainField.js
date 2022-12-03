// Компонент "Доходы"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainFieldString from './MainFieldString';

function MainField({ getOperationList }) {
  const token = useSelector((state) => state.user.token);
  const [inputData, setInputData] = useState('');
  const [categories, setCategories] = useState('');

  let incomeOperations = 'http://92.255.79.239:8000/api/last-5-incomecash/';
  let typeOfSum = 'http://92.255.79.239:8000/api/incomecash/';
  let typeOfCategories = 'http://92.255.79.239:8000/api/income-categories/';

  function getCategories(typeOfCategories) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    fetch(typeOfCategories, options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories));
  }

  useEffect(() => {
    getCategories(typeOfCategories);
  }, []);

  //функция получения суммы внесенных данных по категории "Постоянные".
  function getInputData() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    fetch('http://92.255.79.239:8000/api/sum-incomecash/', options)
      .then((result) => result.json())
      .then((responseServer) => {
        responseServer.map((responseNumber) => {
          let constSum = Number(responseNumber.constant_sum);
          let onceSum = Number(responseNumber.once_sum);

          setInputData(constSum + onceSum);
        });
      });
  }
  useEffect(() => {
    getInputData();
  }, []);

  useEffect(() => {
    getOperationList(incomeOperations, '+');
  }, []);

  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <div className="main_field_title_label">Общий доход</div>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        income_outcome="income"
        endpoint={incomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="+"
      />
      <MainFieldString
        title="Временные"
        type="once"
        income_outcome="income"
        endpoint={incomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        typeForSum="onse_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="+"
      />
    </div>
  );
}

export default MainField;
