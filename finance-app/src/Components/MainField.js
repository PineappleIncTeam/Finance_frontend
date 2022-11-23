// Компонент "Доходы"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainFieldString from './MainFieldString';

function MainField() {
  const token = useSelector((state) => state.user.token);
  const [inputData, setInputData] = useState('');

  //функция получения суммы внесенных данных по категории "Постоянные".
    function getInputData() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      };
      fetch('http://127.0.0.1:8000/api/sum-incomecash/', options)
        .then((result) => result.json())
        .then((responseServer) =>
          setInputData(
            responseServer.map(
              (responseServer) => `Постоянные: ${responseServer.constant_sum}; Временные: ${responseServer.once_sum}`
            )
          )
        );
    }
  useEffect(() => {
    getInputData()
  }, [])

  console.log('MainField rendered');
  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <input className="input_rub" value={inputData} readOnly></input>
      <MainFieldString
        title="Постоянные"
        type="constant"
        getInputData={getInputData} 
        typeForSum="constant_sum"
      />
      <MainFieldString
        title="Временные"
        type="once"
        getInputData={getInputData} 
        typeForSum="onse_sum"
      />
    </div>
  );
}

export default MainField;
