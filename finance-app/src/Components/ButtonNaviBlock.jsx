// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
// import CalcVector from "./../Images/CalcVector.png";
import { NavLink } from "react-router-dom"
import arrow from "./../Images/Arrow.png"
import AnaliticVector from "./../Images/AnaliticVector.png"
import CostsVector from "./../Images/CostsVector.png"
import FieldVector from "./../Images/FieldVector.png"
import StorVector from "./../Images/StorVector.png"

function ButtonNaviBlock() {
  return (
    <div className="button_navi_block">
      <NavLink to="/rectangle/mainfield" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={FieldVector} alt="vectorImg" />
          Доходы
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/rectangle/mainfieldcosts" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={CostsVector} alt="vectorImg" />
          Расходы
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/rectangle/mainfieldstorage" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={StorVector} alt="vectorImg" />
          Накопления
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/rectangle/mainfieldanalitic" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={AnaliticVector} alt="vectorImg" />
          Аналитика
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
      <NavLink to="/rectangle/calculator" className="button" style={{ display: "none" }}>
        <div className="btnStek">
          <img className="vectorBtn" alt="vectorImg" />
          Калькулятор
        </div>
        <img className="arrowVector" src={arrow} alt="vectorImg" />
      </NavLink>
    </div>
  )
}

export default ButtonNaviBlock
