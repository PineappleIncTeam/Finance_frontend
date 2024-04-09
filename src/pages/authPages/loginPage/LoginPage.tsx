import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import useAppDispatch from "../../../hooks/useAppDispatch";

import { TLoginData } from "../../../types/api/Auth";
import { setUser } from "../../../services/redux/features/userData/UserDataSlice";
import { AuthPath } from "../../../services/router/routes";
import { loginUser } from "../../../services/api/auth/Login";

import Logo from "../../../components/logoElement/LogoElement";

import passNo from "./../../../assets/passNo.png";
import passYes from "./../../../assets/passYes.png";

import style from "./LoginPage.module.css";

const LoginPage = () => {
	const [reply, setReply] = useState("");
	const [passwordType, setPasswordType] = useState(passNo);

	const passRef = useRef(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const togglePassInput = () => {
		if (passwordType === passNo) {
			passRef.current.type = "text";
			setPasswordType(passYes);
		} else if (passwordType === passYes) {
			passRef.current.type = "password";
			setPasswordType(passNo);
		}
	};
	const signInHandler = async (values: any, { setSubmitting }: any) => {
		const loginData: TLoginData = {
			username: values.username,
			password: values.password,
		};
		try {
			const response = await loginUser(loginData);
			dispatch(
				setUser({
					token: response.data.auth_token,
				}),
			);

			response.data.auth_token && setReply(`Пользователь ${loginData.username} вошел в свою учетную запись`);

			navigate("/rectangle");
		} catch (e) {
			setReply("Неверно введен логин или пароль");
		} finally {
			setSubmitting(false);
		}
	};

	function resetReply() {
		setReply("");
	}
	const validationSchema = Yup.object({
		username: Yup.string()
			.matches(/^[A-Za-z0-9А-Яа-я@.]+$/, "Логин введен некорректно")
			.min(6, "Логин должен состоять из 6 и более символов")
			.max(32, "Логин должен содержать от 6 до 32 символов")
			.required("Обязательное поле"),

		password: Yup.string()
			.matches(/^[A-Za-z0-9А-Яа-я]+$/, "Пароль введен некорректно")
			.min(6, "Слишком короткий пароль")
			.max(32, "Слишком длинный пароль")
			.minNumbers(1, "Пароль должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру")
			.required("Обязательное поле"),
	});

	return (
		<div className={style.root}>
			<div className={style.signupFormWrap}>
				<div className={style.logo}>
					<Logo />
				</div>
				<div className={style.signupFormContainer}>
					<h1>Вход</h1>
					<Formik
						initialValues={{
							email: "",
							username: "",
							password: "",
						}}
						validateOnBlur
						validationSchema={validationSchema}
						onSubmit={signInHandler}>
						{({ isValid }) => (
							<Form className={style.form} onChange={resetReply}>
								<label>Логин</label>
								<Field type="username" name="username" className={style.input} placeholder={"Введите логин..."} />
								<ErrorMessage name="username" component="div" className={style.error} />
								<br />
								<div className={style.password_recovery}>
									<label>Пароль</label>
									<Link to={AuthPath.RecoveryPassword} className={style.recovery}>
										Забыли пароль?
									</Link>
								</div>
								<div className={style.pass}>
									<Field
										type="password"
										name="password"
										className={style.input}
										placeholder={"Введите пароль..."}
										innerRef={passRef}
									/>
									<img className={style.icon} src={passwordType} onClick={() => togglePassInput()} alt="eye"></img>
									<ErrorMessage name="password" component="div" className={style.error} />
								</div>

								<br />
								<p className={style.textReg}>
									Если у вас нет учетной записи, <br />
									<Link to={AuthPath.Signup} className={style.reg}>
										{" "}
										зарегистрируйтесь
									</Link>
								</p>
								<br />
								<div className={style.only_lat_message}>*только латиница</div>
								<div className={style.reply}>{reply}</div>
								<button className={style.btn} type={"submit"} disabled={isValid}>
									Вперед
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
			<div className={style.signupBackground}></div>
		</div>
	);
};

export default LoginPage;
