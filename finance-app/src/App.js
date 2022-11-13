//Корневой компонент приложения

import "./App.css";
import Rectangle from "./Components/Rectangle";

import { useState, useEffect } from "react";
import RegistPage from "./Components/registration-page/registPage/RegistPage";
import jsonToArray from "./Utils/jsonToArray";
import RegistRoutePage from "./Components/RoutePage/RegistRoutePage";

function App() {
  const [categories, setCategories] = useState("");

  // запрос к серверу на получение категорий "Постоянные доходы". Работает. Надо получаемый JSON перевести в массив категорий. И вообще этот запрос нужен наверное в другом компоненте.
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 1309510b4c507cfc84065785800dcf315312eb24",
      },
    };
    fetch("http://127.0.0.1:8000/api/categories/", options)
      .then((result) => result.json())
      .then((categories) => {
        jsonToArray(categories);
        setCategories(categories);
      });
  }, []);

  console.log(categories);
  return (
    <div className="App">
      <RegistRoutePage />
    </div>
  );
}

export default App;
