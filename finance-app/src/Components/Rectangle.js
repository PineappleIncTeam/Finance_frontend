// Первый компонент, главная страница. Будет появляться после странички авторизации. Сейчас сразу отображается на экране.

import "./Rectangle.css";
import Navigation from "./Navigation";
import MainField from "./MainField";
import { useState } from "react";
import Aside from "./Aside/Aside";
import Transactions from "./Transactions/Transactions";

function Rectangle() {
  // Хук для смены компонента по нажатию кнопок
  const [mainFieldBlock, setMainFieldBlock] = useState(MainField);
  function changeMainField(field) {
    setMainFieldBlock(field);
  }

  return (
    <div className="rectangle">
      <Navigation func={changeMainField} />
      <div className="main">
        <div className="mainField">
          <div className="mainFieldBlock">{mainFieldBlock}</div>
          <div className="aside">
            <Aside />
          </div>
        </div>

        <div className="transactions">
          <Transactions />
        </div>
      </div>
    </div>
  );
}
export default Rectangle;
