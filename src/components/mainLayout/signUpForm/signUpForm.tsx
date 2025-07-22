"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { env } from "next-runtime-env";
import * as VKID from "@vkid/sdk";

import { ISignUpForm } from "../../../types/components/ComponentsTypes";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import { emailPattern, errorPasswordRepeat, passwordPattern } from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { InputTypeList } from "../../../helpers/Input";
import { registration } from "../../../services/api/auth/Registration";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import CustomCheckbox from "../../../ui/checkBox/checkBox";
import Button from "../../../ui/Button/Button1";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { generateCodeVerifier, generateState } from "../../../utils/generateAuthTokens";
import { AuthVk } from "../../../services/api/auth/VkAuth";
import { ILoginSuccessPayload, IVkAuthRequest } from "../../../types/pages/Authorization";

import styles from "./signUpForm.module.scss";

export default function SignUpForm() {
	const [baseUrl, setBaseUrl] = useState<string>("");
	const [codeVerifier, setCodeVerifier] = useState<string>("");

	const {
		formState: { isValid, errors },
		control,
		watch,
		handleSubmit,
	} = useForm<ISignUpForm>({
		defaultValues: {
			email: "",
			password: "",
			// eslint-disable-next-line camelcase
			re_password: "",
			agreementField: false,
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	const vkAppId = Number(env("NEXT_PUBLIC_VK_APP_ID"));

	const authCurtainRenderObj: VKID.FloatingOneTapParams = {
		appName: "freenance-app",
		scheme: VKID.Scheme.LIGHT,
		lang: VKID.Languages.RUS,
		indent: { top: 30, right: 50 },
	};

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		setCodeVerifier(String(generateCodeVerifier()));
	}, []);

	VKID.Config.init({
		app: 0,
		redirectUrl: `${getCorrectBaseUrl()}${UserProfilePath.ProfitMoney}`,
		state: generateState(),
		codeVerifier: String(generateCodeVerifier()),
		scope: "email phone",
		responseMode: VKID.ConfigResponseMode.Callback,
	});

	const floatingOneTap = new VKID.FloatingOneTap();

	async function authVkIdService(authData: IVkAuthRequest) {
		try {
			if (baseUrl) {
				const response = await AuthVk(baseUrl, authData);
				if (response.status === axios.HttpStatusCode.Ok) {
					router.push(UserProfilePath.ProfitMoney);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				router.push(MainPath.ServerError);
			}
		}
	}

	floatingOneTap.on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, async (payload: ILoginSuccessPayload) => {
		const data = {
			code: payload.code,
			// eslint-disable-next-line camelcase
			device_id: payload.device_id,
			// eslint-disable-next-line camelcase
			code_verifier: codeVerifier,
		};
		authVkIdService(data);
	});

	function handleOpenAuthCurtain() {
		setCodeVerifier(String(generateCodeVerifier()));
		floatingOneTap.render(authCurtainRenderObj);
	}

	const validateRepeatPassword = (value: string | boolean | undefined) => {
		const password = watch(InputTypeList.Password);
		return value === password || errorPasswordRepeat;
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
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
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
					subtitle="Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
					error={formHelpers.getPasswordError(errors, control._formValues.password)}
					name={"password"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
				/>
				<AuthInput
					label={"Повторите пароль"}
					type={InputTypeList.Password}
					placeholder="Пароль"
					control={control}
					name={"re_password"}
					error={errors.re_password?.message}
					rules={{
						required: true,
						validate: validateRepeatPassword,
					}}
				/>
				<div className={styles.securityPolicyWrapper}>
					<div className={styles.securityPolicyWrapper__Checkbox}>
						<CustomCheckbox control={control} name={"agreementField"} rules={{ required: true }} />
						<p className={styles.securityPolicyWrapper__Text}>
							Я соглашаюсь с{" "}
							<Link className={styles.securityPolicyWrapper__Link} href={MainPath.UserAgreement}>
								политикой конфиденциальности
							</Link>{" "}
							и даю{" "}
							<Link className={styles.securityPolicyWrapper__Link} href={MainPath.UserAgreement}>
								согласие на обработку и хранения персональных данных
							</Link>{" "}
						</p>
					</div>
				</div>
				<Button
					variant={ButtonType.Notification}
					className={styles.button}
					disabled={!isValid}
					type={InputTypeList.Submit}>
					Зарегистрироваться
				</Button>
				<div className={styles.dividerWrap}>
					<div className={styles.dividerWrap__line} />
					<span className={styles.dividerWrap__subtitle}>или</span>
					<div className={styles.dividerWrap__line} />
				</div>
				<p className={styles.signUpFormContainer__auth}>
					Войти через{" "}
					<button
						className={styles.signUpFormContainer__auth_link}
						type={InputTypeList.Button}
						onClick={() => handleOpenAuthCurtain()}>
						Вконтакте
					</button>
				</p>
			</div>
		</form>
	);
}
