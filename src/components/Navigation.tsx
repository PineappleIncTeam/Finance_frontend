//Компонент-контейнер, включает в себя компоненты Логотип и Навигацию кнопками по приложению

import { useNavigate } from "react-router";

import useAppDispatch from "../hooks/useAppDisptch";

import { removeUser } from "../services/redux/features/userData/UserDataSlice";

import ButtonNaviBlock from "./ButtonNaviBlock";

import Logo from "./Logo";
import exitUser from "./../../src/assets/exit.png";

import "./Navigation.css";

function Navigation({ menuActive }: any) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const exitClick = () => {
		dispatch(removeUser());
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className={menuActive ? "navigation active" : "navigation"}>
			<Logo />
			<ButtonNaviBlock />
			<div className="exit" onClick={() => exitClick()}>
				<div className="textExit">Выход</div>
				<img src={exitUser} alt="exit" />
			</div>
		</div>
	);
}

export default Navigation;
