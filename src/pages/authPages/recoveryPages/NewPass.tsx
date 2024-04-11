import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import { InputTypeBase, TNewPasswordFormValues } from "../../../types/pages/Authorization";
import Logo from "../../../components/logoElement/LogoElement";
import { AuthPath } from "../../../services/router/routes";

import { changeUserPassword } from "../../../services/api/auth/NewPassword1";

import { ChangingUserPassword } from "../../../types/api/Auth";

import passNo from "./../../../assets/passNo.png";
import passYes from "./../../../assets/passYes.png";

import style from "./RecoveryPages.module.css";

const NewPass = () => {
	const [message, setMessage] = useState<string>("");
	const [passwordType, setPasswordType] = useState<InputTypeBase>({
		eye: passNo,
		type: "password",
	});
	const [confirmType, setConfirmType] = useState<InputTypeBase>({
		eye: passNo,
		type: "password",
	});

	const location = useLocation();
	const navigate = useNavigate();

	const { uid, token } = queryString.parse(location.search);

	const formInitialValues: TNewPasswordFormValues = {
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = async (values: TNewPasswordFormValues) => {
		const userData: ChangingUserPassword = {
			uid: uid,
			token: String(token),
			new_password: values.password,
			re_new_password: values.confirmPassword,
		};
		const response = await changeUserPassword(userData);

		if (response.status === 204) {
			setMessage("Ваш пароль успешно изменен");
			setTimeout(() => navigate("/"), 3000);
		}
	};

	const togglePassInput = () => {
		return setPasswordType({
			eye: passwordType.eye === passYes ? passNo : passYes,
			type: passwordType.eye === passYes ? "password" : "text",
		});
	};

	const toggleConfirmInput = () => {
		if (confirmType.eye === passNo) {
			setConfirmType({ eye: passYes, type: "text" });
		} else if (confirmType.eye === passYes) {
			setConfirmType({ eye: passNo, type: "password" });
		}
	};

	function validatePass(value: string) {
		return !value ? "Обязательно" : "";
	}

	function validateConfirmPass(password: string, value: string) {
		return !value ? "Обязательно" : password !== value ? "Пароли не совпадают" : "";
	}

	return (
		<div className={style.root}>
			<div className={style.newPasswordFormWrap}>
				<div className={style.logo}>
					<Logo />
				</div>
				<div className={style.newPasswordFormContainer}>
					<h1>Изменение пароля</h1>
					<Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
						{({ errors, touched, values }) => (
							<Form className={style.form}>
								<label>Пароль</label>
								<div className={style.pass}>
									<Field
										className={touched.password && errors.password ? style.inputError : style.input}
										type={passwordType.type}
										name="password"
										placeholder="Введите пароль"
										validate={validatePass}
									/>
									<img className={style.icon} src={passwordType.eye} alt="eye" onClick={() => togglePassInput()}></img>
									<div className={style.error}>{touched.password && errors.password}</div>
								</div>
								<label>Повторите пароль</label>
								<div className={style.pass}>
									<Field
										className={touched.confirmPassword && errors.confirmPassword ? style.inputError : style.input}
										type={confirmType.type}
										name="confirmPassword"
										placeholder="Повторите пароль"
										validate={(value: string) => validateConfirmPass(values.password, value)}
									/>
									<img
										className={style.icon}
										src={confirmType.eye}
										alt="eye"
										onClick={() => toggleConfirmInput()}></img>
									<div className={style.error}>{touched.confirmPassword && errors.confirmPassword}</div>
								</div>
								<div className={style.message}>{message}</div>
								<button className={style.btn} type="submit">
									Готово
								</button>
							</Form>
						)}
					</Formik>
					<Link to={AuthPath.Login} className={style.recovery}>
						Вернуться назад
					</Link>
				</div>
			</div>
			<div className={style.newPasswordBackground}></div>
		</div>
	);
};

export default NewPass;
