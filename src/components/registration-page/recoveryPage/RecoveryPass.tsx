import { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

import Logo from "../../Logo";
import { AuthPath } from "../../../services/router/routes";
import { URLS } from "../../../helpers/urlsAndDates";

import style from "./RecoveryPass.module.css";

const RecoveryPass = () => {
	const [message, setMessage] = useState("");

	const validateEmail = (value) => {
		if (!value) {
			return "Обязательное поле";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			return "Введёт некорректный email";
		}
	};

	const sendEmail = async (values: any) => {
		const data = {
			email: values.email,
		};

		const response = await axios.post(URLS.resetPassword, data);

		return response.status === 204 && setMessage("На указанный вами адрес почты отправлено письмо для сброса пароля");
	};

	return (
		<div className={style.root}>
			<div className={style.formRegist}>
				<div className={style.logo}>
					<Logo />
				</div>
				<div className={style.regist}>
					<h1>Восстановление пароля</h1>
					<Formik
						initialValues={{
							email: "",
						}}
						onSubmit={sendEmail}>
						{({ errors, touched, values }) => (
							<Form className={style.form}>
								<label>Введите электронную почту</label>
								<Field
									className={(values.email || touched.email) && errors.email ? style.inputError : style.input}
									type="email"
									name="email"
									validate={validateEmail}
									placeholder="example@mail.ru"
								/>
								<div className={style.error}>{(values.email || touched.email) && errors.email}</div>
								<div className={style.message}>{message}</div>
								<button className={style.btn} type="submit">
									Восстановить
								</button>
							</Form>
						)}
					</Formik>
					<Link to={AuthPath.Login} className={style.recovery}>
						Вернуться назад
					</Link>
				</div>
			</div>
			<div className={style.registFon}></div>
		</div>
	);
};

export default RecoveryPass;
