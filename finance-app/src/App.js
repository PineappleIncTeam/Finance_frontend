//Корневой компонент приложения

import "./App.css";
import Rectangle from "./Components/Rectangle";

import { useState, useEffect } from "react";
import RegistPage from "./Components/registration-page/registPage/RegistPage";
import jsonToArray from "./Utils/jsonToArray";
import RegistRoutePage from "./Components/RoutePage/RegistRoutePage";

function App() {
  
  return (
    <div className="App">
      <RegistRoutePage />
    </div>
  );
}

export default App;
