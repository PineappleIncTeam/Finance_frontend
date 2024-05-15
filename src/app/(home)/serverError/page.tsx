import style from "./serverError.module.css";

export default function ServerErrorPage() {
	return (
		<div className={style.serverError}>
			<div className={style.serverError__textWrapper}>
				<h1 className={style.serverError__title}>Ошибка на сервере...</h1>
				<p className={style.serverError__text}>Приложение еще активно разрабатывается и ошибки случаются...</p>
				<p className={style.serverError__text}>
					Пока Вы это читаете, по тревоге были подняты наши программисты и администраторы, которые уже прочитали
					подробный отчет об этой ошибке и приступили к ее устранению.
				</p>
				<p className={style.serverError__text}>В ближайшее время она будет исправлена!</p>
			</div>
		</div>
	);
}
