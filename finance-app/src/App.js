//Корневой компонент приложения

import "./App.css";
import Rectangle from "./Components/Rectangle";

import { useState, useEffect } from "react";
import RegistPage from "./Components/registration-page/registPage/RegistPage";
import jsonToArray from "./Utils/jsonToArray";
import RegistRoutePage from "./Components/RoutePage/RegistRoutePage";
import { Context } from "./Components/context";

function App() {
  const [token, setToken] = useState();
  return (
    <Context.Provider value={{ token, setToken }}>
      <div className="App">
        <RegistRoutePage />
      </div>
    </Context.Provider>
  );
}

export default App;
