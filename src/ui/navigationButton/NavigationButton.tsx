import { NavLink } from "react-router-dom";

import { AuthPath, MainFieldPath } from "../../services/router/routes";

import arrow from "../../assets/Arrow.png";
import AnalyticVector from "../../assets/AnalyticVector.png";
import CostsVector from "../../assets/CostsVector.png";
import FieldVector from "../../assets/FieldVector.png";
import StorVector from "../../assets/StorVector.png";
import CalcVector from "../../assets/CalcVector.png";

import styles from "./NavigationButton.module.css";

// Компонент навигации по приложению. Переключает компоненты, соответствующие названию кнопок.
function NavigationButton() {
	return (
		<div className="button_navi_block">
			<NavLink to={`${AuthPath.RectanglePage}${MainFieldPath}`} className="button">
				<div className="btnStek">
					<img className="vectorBtn" src={FieldVector} alt="vectorImg" />
					Доходы
				</div>
				<span className={styles.span}></span>
				<img className="arrowVector" src={arrow} alt="vectorImg" />
			</NavLink>
			<NavLink to={`${AuthPath.RectanglePage}${MainFieldPath.Cost}`} className="button">
				<div className="btnStek">
					<img className="vectorBtn" src={CostsVector} alt="vectorImg" />
					Расходы
				</div>
				<img className="arrowVector" src={arrow} alt="vectorImg" />
			</NavLink>
			<NavLink to={`${AuthPath.RectanglePage}${MainFieldPath.Storage}`} className="button">
				<div className="btnStek">
					<img className="vectorBtn" src={StorVector} alt="vectorImg" />
					Накопления
				</div>
				<img className="arrowVector" src={arrow} alt="vectorImg" />
			</NavLink>
			<NavLink to={`${AuthPath.RectanglePage}${MainFieldPath.Analytics}`} className="button">
				<div className="btnStek">
					<img className="vectorBtn" src={AnalyticVector} alt="vectorImg" />
					Аналитика
				</div>
				<img className="arrowVector" src={arrow} alt="vectorImg" />
			</NavLink>
			<NavLink to={`${AuthPath.RectanglePage}${MainFieldPath.Calculator}`} className="button">
				<div className="btnStek">
					<img className="vectorBtn" src={CalcVector} alt="vectorImg" />
					Калькулятор
				</div>
				<img className="arrowVector" src={arrow} alt="vectorImg" />
			</NavLink>
		</div>
	);
}

export default NavigationButton;
