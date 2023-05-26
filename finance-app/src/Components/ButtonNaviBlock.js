// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
import { NavLink } from "react-router-dom"
import arrow from "./../Images/Arrow.png"
import AnaliticVector from "./../Images/AnaliticVector.png"
// import CalcVector from "./../Images/CalcVector.png";
import CostsVector from "./../Images/CostsVector.png"
import FieldVector from "./../Images/FieldVector.png"
import StorVector from "./../Images/StorVector.png"

function ButtonNaviBlock() {
  return (
    <div className="button_navi_block">
      <NavLink to="/rectangle/mainfield" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={FieldVector} alt="vectorImg"></img>Доходы
        </div>

        <img className="arrowVector" src={arrow} alt="vectorImg"></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldcosts" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={CostsVector} alt="vectorImg"></img> Расходы{" "}
        </div>

        <img className="arrowVector" src={arrow} alt="vectorImg"></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldstorage" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={StorVector} alt="vectorImg"></img> Накопления{" "}
        </div>

        <img className="arrowVector" src={arrow} alt="vectorImg"></img>
      </NavLink>
      <NavLink to="/rectangle/mainfieldanalitic" className="button">
        <div className="btnStek">
          <img className="vectorBtn" src={AnaliticVector} alt="vectorImg"></img> Аналитика{" "}
        </div>

        <img className="arrowVector" src={arrow} alt="vectorImg"></img>
      </NavLink>
    </div>
  )
}

export default ButtonNaviBlock
