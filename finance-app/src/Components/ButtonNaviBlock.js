// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
// import Button from './Button';
import MainField from './MainField';
import MainFieldCosts from './MainFieldCosts';
import MainFieldStorage from './MainFieldStorage';
import MainFieldAnalitic from './MainFieldAnalitic';

function ButtonNaviBlock({ func }) {
  // const buttonName = ['Доходы', 'Расходы', 'Накопления', 'Аналитика'];
  // const buttonFrame = ['MainField', 'MainFieldCosts', 'MainFieldStorage'];
  return (
    <div className="button_navi_block">
      <button className="button" onClick={() => func(MainField)}>
        Доходы
      </button>
      <button className="button" onClick={() => func(MainFieldCosts)}>
        Расходы
      </button>
      <button className="button" onClick={() => func(MainFieldStorage)}>
        Накопления
      </button>
      <button className="button" onClick={() => func(MainFieldAnalitic)}>
        Аналитика
      </button>
    </div>
  );
}

export default ButtonNaviBlock;

/*
      {buttonName.map((text, index) => {
        return <Button text={text} key={index} onClick={() => func([index])} />;
      })} */
