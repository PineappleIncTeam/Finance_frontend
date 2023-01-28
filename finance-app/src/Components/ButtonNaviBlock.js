// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
// import Button from './Button';
import MainField from "./MainField";
import MainFieldCosts from "./MainFieldCosts";
import MainFieldStorage from "./MainFieldStorage";
import MainFieldAnalitic from "./MainFieldAnalitic";
import { Link, NavLink } from "react-router-dom";
import arrow from "./../Images/Arrow.png";
import AnaliticVector from "./../Images/AnaliticVector.png";
import CalcVector from "./../Images/CalcVector.png";
import CostsVector from "./../Images/CostsVector.png";
import FieldVector from "./../Images/FieldVector.png";
import StorVector from "./../Images/StorVector.png";

function ButtonNaviBlock() {
  // const buttonName = ['Доходы', 'Расходы', 'Накопления', 'Аналитика'];
  // const buttonFrame = ['MainField', 'MainFieldCosts', 'MainFieldStorage'];
  return (
    <div className="button_navi_block">
      <NavLink to="/rectangle/mainfield" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={FieldVector}></img>Доходы
        </div>

        <img className="arrowVector" src={arrow}></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldcosts" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={CostsVector}></img> Расходы{" "}
        </div>

        <img className="arrowVector" src={arrow}></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldstorage" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={StorVector}></img> Накопления{" "}
        </div>

        <img className="arrowVector" src={arrow}></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldanalitic" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={AnaliticVector}></img> Аналитика{" "}
        </div>

        <img className="arrowVector" src={arrow}></img>
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
