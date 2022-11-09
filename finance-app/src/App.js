//Корневой компонент приложения

import "./App.css";
import Rectangle from "./Components/Rectangle";
import Form from "./Components/registration-page/Form";
import { useState, useEffect } from "react";
import RegistPage from "./Components/registration-page/registPage/RegistPage";

function App() {
  const [categories, setCategories] = useState("");

  // запрос к серверу на получение категорий "Постоянные доходы". Вроде работает. Возвращает пустой массив, т.к. запрос от неавторизованного пользователя.
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((result) => result.json())
      .then((categories) => setCategories(categories));
  }, []);

  console.log(categories);
  return (
    <div className="App">
      <Form />
      <Rectangle categories={categories} />
    </div>
  );
}

export default App;
