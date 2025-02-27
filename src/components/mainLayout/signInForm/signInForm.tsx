"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import useAppDispatch from "../../../hooks/useAppDispatch";

import { ICorrectSignInForm, ISignInForm } from "../../../types/components/ComponentsTypes";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import CustomCheckbox from "../../../ui/checkBox/checkBox";
import InviteModal from "../inviteModal/inviteModal";
import { emailPattern, passwordPattern } from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { InputTypeList } from "../../../helpers/Input";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { loginUser } from "../../../services/api/auth/Login";
import { setAutoLoginStatus } from "../../../services/redux/features/autoLogin/autoLoginSlice";
import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./signInForm.module.scss";

const SignInForm = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm<ISignInForm>({
		defaultValues: {
			email: "",
			password: "",
			isAutoAuth: false,
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const onSubmit = async (data: ISignInForm) => {
		try {
			setErrorMessage("");
			if (baseUrl && data.password) {
				const correctUserData: ICorrectSignInForm = {
					email: data.email ?? "",
					password: data.password,
				};
				await loginUser(baseUrl, correctUserData);
				setIsOpen(true);
				if (data.isAutoAuth) dispatch(setAutoLoginStatus(data.isAutoAuth));
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
			setErrorMessage("Введены некорректный email или пароль");
		}
	};

	const handleModalClose = () => {
		setIsOpen(false);
		router.push(UserProfilePath.ProfitMoney);
	};

	return (
		<form className={styles.signInFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.signInFormContainer}>
				<Title title={"Вход"} />
				<AuthInput
					control={control}
					label={"Введите почту"}
					type={InputTypeList.Email}
					placeholder="_@_._"
					name={"email"}
					error={formHelpers.getEmailError(errors)}
					rules={{ required: true, pattern: emailPattern }}
				/>
				<AuthInput
					label={"Введите пароль"}
					type={InputTypeList.Password}
					placeholder="Пароль"
					error={formHelpers.getPasswordError(errors, control._formValues.password)}
					name={"password"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
				/>
				<div className={styles.additionalFunctionsWrap}>
					<div className={styles.additionalFunctionsWrap__checkbox}>
						<CustomCheckbox control={control} name={"isAutoAuth"} />
						<p className={styles.checkBoxText}>Запомнить меня</p>
					</div>
					<Link href={MainPath.NewPassword} className={styles.forgetPassword}>
						Забыли пароль?
					</Link>
				</div>
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
				<Button variant={ButtonType.Notification} type={InputTypeList.Submit} className={styles.button}>
					Вход
				</Button>
				<div className={styles.dividerWrap}>
					<div className={styles.dividerWrap__line} />
					<span className={styles.dividerWrap__subtitle}>или</span>
					<div className={styles.dividerWrap__line} />
				</div>
				<p className={styles.signInFormContainer__auth}>
					Войти через{" "}
					<a
						href="https://vk.com/"
						rel="nofollow noreferrer"
						target="_blank"
						className={styles.signInFormContainer__auth_link}>
						Вконтакте
					</a>
				</p>
			</div>
			{isOpen && <InviteModal isOpen={isOpen} onClose={handleModalClose} />}
		</form>
	);
};

export default SignInForm;
