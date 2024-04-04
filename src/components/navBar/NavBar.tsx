//Компонент-контейнер, включает в себя компоненты Логотип и Навигацию кнопками по приложению

import { useNavigate } from "react-router";

import useAppDispatch from "../../hooks/useAppDispatch";

import NavigationButton from "../../ui/navigationButton/NavigationButton";
import { removeUser } from "../../services/redux/features/userData/UserDataSlice";

import Logo from "../logoElement/LogoElement";

import exitUser from "../../assets/exit.png";

import "./NavBar.css";

function NavBar({ menuActive }: any) {
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
			<NavigationButton />
			<div className="exit" onClick={() => exitClick()}>
				<div className="textExit">Выход</div>
				<img src={exitUser} alt="exit" />
			</div>
		</div>
	);
}

export default NavBar;
