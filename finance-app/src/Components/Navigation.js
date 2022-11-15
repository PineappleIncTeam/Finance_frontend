//Компонент-контейнер, включает в себя компоненты Логотип и Навигацию кнопками по приложению
import "./Navigation.css";
import Logo from "./Logo";
import ButtonNaviBlock from "./ButtonNaviBlock";
import exitUser from "./../../src/Images/exit.png";
import { useNavigate } from "react-router";
import MainFieldRouter from "./RoutePage/MainFieldRouter";

function Navigation() {
  const navigate = useNavigate();
  const exitClick = () => {
    navigate("/");
  };
  return (
    <div className="navigation">
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
