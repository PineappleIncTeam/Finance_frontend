import { NavLink } from "react-router-dom";

function ButtonNaviBlock() {
  return (
    <div className="button_navi_block">
      <NavLink to="/rectangle/mainfield" className="button navButton">
        <div className="btnStek">Доходы</div>
      </NavLink>
      <NavLink to="/rectangle/mainfieldcosts" className="button navButton">
        <div className="btnStek">Расходы</div>
      </NavLink>
      <NavLink to="/rectangle/mainfieldstorage" className="button navButton">
        <div className="btnStek">Накопления</div>
      </NavLink>
      <NavLink to="/rectangle/mainfieldanalitic" className="button navButton">
        <div className="btnStek">Аналитика</div>
      </NavLink>
      <NavLink to="/rectangle/calculator" className="button navButton">
        <div className="btnStek">Калькулятор</div>
      </NavLink>
    </div>
  );
}

export default ButtonNaviBlock;
