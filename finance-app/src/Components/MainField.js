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
              (responseServer) => responseServer.sum_constant_sum
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
      />
      <MainFieldString
        title="Временные"
        type="once"
        getInputData={getInputData}
      />
    </div>
  );
}

export default MainField;
