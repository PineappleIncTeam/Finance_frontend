//Компонент-контейнер, включает в себя компоненты Логотип и Навигацию кнопками по приложению
import "./Navigation.css";
import Logo from "./Logo";
import ButtonNaviBlock from "./ButtonNaviBlock";
import Form from "./registration-page/auth/Form";

function Navigation({ func }) {
  return (
    <div className="navigation">
      <Logo />
      <ButtonNaviBlock func={func} />
    </div>
  );
}

export default Navigation;
