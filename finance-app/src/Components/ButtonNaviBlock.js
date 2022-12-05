// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
// import Button from './Button';
import MainField from "./MainField";
import MainFieldCosts from "./MainFieldCosts";
import MainFieldStorage from "./MainFieldStorage";
import MainFieldAnalitic from "./MainFieldAnalitic";
import { Link, NavLink } from "react-router-dom";

function ButtonNaviBlock() {
  // const buttonName = ['Доходы', 'Расходы', 'Накопления', 'Аналитика'];
  // const buttonFrame = ['MainField', 'MainFieldCosts', 'MainFieldStorage'];
  return (
    <div className="button_navi_block">
      <NavLink to="/rectangle/mainfield" className="button">
        Доходы
      </NavLink>
      <NavLink to="/rectangle/mainfieldcosts" className="button">
        Расходы
      </NavLink>
      <NavLink to="/rectangle/mainfieldstorage" className="button">
        Накопления
      </NavLink>
      <NavLink to="/rectangle/mainfieldanalitic" className="button">
        Аналитика
      </NavLink>

      {/* <Link className="button" onClick={() => func(MainFieldCosts)}>
        Расходы
      </Link>
      <button className="button" onClick={() => func(MainFieldStorage)}>
        Накопления
      </button>
      <button className="button" onClick={() => func(MainFieldAnalitic)}>
        Аналитика
      </button> */}
    </div>
  );
}

export default ButtonNaviBlock;

/*
      {buttonName.map((text, index) => {
        return <Button text={text} key={index} onClick={() => func([index])} />;
      })} */
