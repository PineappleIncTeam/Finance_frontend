import style from "./ServerErrorPage.module.css";

export const ServerErrorPage = () => {
	return (
		<div className={style.server_error}>
			<div className={style.server_error__text_wrapper}>
				<h1 className={style.server_error__title}>Ошибка на сервере...</h1>
				<p className={style.server_error__text}>Приложение еще активно разрабатывается и ошибки случаются...</p>
				<p className={style.server_error__text}>
					Пока Вы это читаете, по тревоге были подняты наши программисты и администраторы, которые уже прочитали
					пожробный отчет об этой ошибке и приступили к ее устранению.
				</p>
				<p className={style.server_error__text}>В ближайшее время она будет уиправлена!</p>
			</div>
		</div>
	);
};
