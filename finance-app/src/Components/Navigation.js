//Компонент-контейнер, включает в себя компоненты Логотип и Навигацию кнопками по приложению
import "./Navigation.css";
import Logo from "./Logo";
import ButtonNaviBlock from "./ButtonNaviBlock";
import exitUser from "./../../src/Images/exit.png";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { removeUser } from "../store/slice";
import { useAuth } from "./registration-page/use-auth";

function Navigation({ menuActive, setMenuActive }) {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const exitClick = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div
      className={menuActive ? "navigation active" : "navigation"}
      active={menuActive}
    >
      <Logo />
      <ButtonNaviBlock />
      <div className="exit" onClick={() => exitClick()}>
        <div className="textExit">Выход</div>
        <img src={exitUser} />
      </div>
    </div>
  );
}

export default Navigation;
