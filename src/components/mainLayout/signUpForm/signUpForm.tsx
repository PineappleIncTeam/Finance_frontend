/* eslint-disable import/named */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError, HttpStatusCode } from "axios";

import { ISignUpForm } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/button/button";
import Input from "../../../ui/input/Input";
import Title from "../../../ui/title/Title";
import { emailPattern, errorPasswordRepeat, passwordPattern } from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { InputType } from "../../../helpers/Input";
import { registration } from "../../../services/api/auth/Registration";
import { MainPath } from "../../../services/router/routes";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { vkLink } from "../../../mocks/linkSetup";

import styles from "./signUpForm.module.scss";

const SignUpForm = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const {
		formState: { errors },
		control,
		watch,
		handleSubmit,
	} = useForm<ISignUpForm | any>({
		defaultValues: {
			email: "",
			password: "",
			// eslint-disable-next-line camelcase
			re_password: "",
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const validateRepeatPassword = (value: string) => {
		const password = watch(InputType.Password);
		return value === password || errorPasswordRepeat;
	};

	const goBack = () => {
		router.back();
	};

	const isAxiosError = (error: unknown): error is AxiosError => {
		return (error as AxiosError).isAxiosError !== undefined;
	};

	const onSubmit = async (data: ISignUpForm) => {
		try {
			if (baseUrl) {
				await registration(baseUrl, data);
				router.push(MainPath.Login);
			} else {
				return router.push(MainPath.ServerError);
			}
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
			return router.push(MainPath.NotFound);
		}
	};

	return (
		<form className={styles.signUpFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.signUpFormContainer}>
				<Title title={"Регистрация"} />
				<Input
					control={control}
					label={"Введите почту"}
					type="email"
					placeholder="_@_._"
					name={"email"}
					error={formHelpers.getEmailError(errors)}
					rules={{ required: true, pattern: emailPattern }}
				/>
				<Input
					label={"Введите пароль"}
					type={InputType.Password}
					placeholder="Пароль"
					subtitle="Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
					error={formHelpers.getPasswordError(errors, control._formValues.password)}
					name={"password"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
				/>
				<Input
					label={"Повторите пароль"}
					type={InputType.Password}
					placeholder="Пароль"
					control={control}
					name={"re_password"}
					error={errors.re_password?.message}
					rules={{
						required: true,
						validate: validateRepeatPassword,
					}}
				/>
				<div className={styles.actionWrap}>
					<Button content="Отменить" styleName="small buttonForRegistration" onClick={goBack} />
					<Button content="Вход" styleName="small buttonForLogin" type="submit" />
				</div>
				<div className={styles.dividerWrap}>
					<div className={styles.dividerWrap__line} />
					<span className={styles.dividerWrap__subtitle}>или</span>
					<div className={styles.dividerWrap__line} />
				</div>
				<p className={styles.signUpFormContainer__auth}>
					Войти через{" "}
					<a href={vkLink} rel="nofollow noreferrer" target="_blank" className={styles.signUpFormContainer__auth_link}>
						Вконтакте
					</a>
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
