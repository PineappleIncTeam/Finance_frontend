// Первый компонент, главная страница. Будет появляться после странички авторизации. Сейчас сразу отображается на экране.

import './Rectangle.css';
import Navigation from './Navigation';
import MainField from './MainField';
import { useState } from 'react';

function Rectangle() {
  // Хук для смены компонента по нажатию кнопок
  const [mainFieldBlock, setMainFieldBlock] = useState(MainField);
  function changeMainField(field) {
    setMainFieldBlock(field);
  }

  return (
    <div className="rectangle">
      <Navigation func={changeMainField} />
      {mainFieldBlock}
    </div>
  );
}
export default Rectangle;
