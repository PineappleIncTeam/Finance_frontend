import Image from "next/image";

import manHoldingDisconnection from "../../../assets/pages/serverError/manHoldingDisconnection.png";

import style from "./serverError.module.scss";

function ServerErrorPage() {
	return (
		<div className={style.serverErrorWrap}>
			<Image className={style.manHoldingDisconnection} src={manHoldingDisconnection} alt="man holding disconnection" />
			<div className={style.infoContainer}>
				<h1 className={style.serverErrorContainer__title}>Ошибка на сервере...</h1>
				<p className={style.serverErrorContainer__subtitle}>
					Приложение еще активно разрабатывается и ошибки случаются...
				</p>
				<p className={style.serverErrorContainer__subtitle}>
					Пока Вы это читаете, по тревоге были подняты наши программисты и администраторы, которые уже прочитали
					подробный отчет об этой ошибке и приступили к ее устранению.
				</p>
				<p className={style.serverErrorContainer__subtitle}>В ближайшее время она будет исправлена!</p>
			</div>
		</div>
	);
}

export default ServerErrorPage;
