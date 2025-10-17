"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError, AxiosResponse } from "axios";
import { env } from "next-runtime-env";
import * as VKID from "@vkid/sdk";

import { ISignUpForm } from "../../../types/components/ComponentsTypes";
import { IPkceCodeSet, IVKLoginSuccessPayload, IVkAuthRequest, AuthTypes } from "../../../types/pages/Authorization";
import { IUserDataState } from "../../../types/redux/StateTypes";
import { IVKServiceDataResponse } from "../../../types/api/Auth";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import Button from "../../../ui/Button/Button";
import {
	emailPattern,
	errorPasswordRepeat,
	errorUserWithExistEmailRegistration,
	passwordPattern,
} from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { InputTypeList } from "../../../helpers/Input";
import { registration } from "../../../services/api/auth/registration";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { authApiVkService } from "../../../services/api/auth/authVkService";
import CustomCheckbox from "../../../ui/checkBox/checkBox";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { generatePkceChallenge, generateState } from "../../../utils/generateAuthTokens";
import { setUser } from "../../../services/redux/features/userData/UserDataSlice";
import { useAppDispatch } from "../../../services/redux/hooks/useAppDispatch";
import { ruCountryNumber } from "../../../helpers/userDataConstants";

import styles from "./signUpForm.module.scss";

export default function SignUpForm() {
	const [pkceCodeSet, setPkceCodeSet] = useState<IPkceCodeSet>();

	const dispatch = useAppDispatch();

	const {
		formState: { isValid, errors },
		control,
		watch,
		setError,
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

	const vkAppId = Number(env("NEXT_PUBLIC_VK_APP_ID") ?? 0);
	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

	const authCurtainRenderObj: VKID.FloatingOneTapParams = {
		appName: "freenance-app",
		scheme: VKID.Scheme.LIGHT,
		lang: VKID.Languages.RUS,
		indent: { top: 30, right: 50 },
	};

	useEffect(() => {
		(async () => {
			await setPkceCodeSet(await generatePkceChallenge());
		})();
	}, []);

	VKID.Config.init({
		app: vkAppId ?? 0,
		redirectUrl: `${baseUrl}${UserProfilePath.ProfitMoney}`,
		state: generateState(),
		codeChallenge: String(pkceCodeSet?.code_challenge ?? ""),
		scope: "email phone",
		responseMode: VKID.ConfigResponseMode.Callback,
		mode: VKID.ConfigAuthMode.InNewWindow,
	});

	const floatingOneTap = new VKID.FloatingOneTap();

	async function authVkIdService(authData: IVkAuthRequest) {
		try {
			if (baseUrl) {
				const response: AxiosResponse<IVKServiceDataResponse> = await authApiVkService(baseUrl, authData);
				if (response.status === axios.HttpStatusCode.Ok) {
					const userInfo = response.data.user_info.user;
					const userAvatar = userInfo.avatar.includes("?")
						? userInfo.avatar.substring(0, userInfo.avatar.indexOf("?"))
						: userInfo.avatar;

					const userData: IUserDataState = {
						email: userInfo.email ?? "",
						nickname: userInfo.first_name + (userInfo.last_name ? `${" "}${userInfo.last_name}` : ""),
						country: Number(userInfo.country) || ruCountryNumber,
						// eslint-disable-next-line camelcase
						country_name: userInfo.country || "",
						gender: userInfo.sex === 2 ? "M" : "F",
						avatar: userAvatar,
						defaultAvatar: 0,
					};
					dispatch(setUser(userData));
					localStorage.setItem("authType", AuthTypes.vkServiceAuth);
					router.push(UserProfilePath.ProfitMoney);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	}

	floatingOneTap.on(
		VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS,
		// eslint-disable-next-line camelcase
		async ({ code, device_id }: IVKLoginSuccessPayload) => {
			const data = {
				code: code,
				// eslint-disable-next-line camelcase
				code_verifier: pkceCodeSet?.code_verifier ?? "",
				// eslint-disable-next-line camelcase
				device_id: device_id,
			};

			authVkIdService(data);
		},
	);

	async function handleOpenAuthCurtain() {
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
			if (isAxiosError(error) && error?.response?.status === axios.HttpStatusCode.BadRequest) {
				setError("email", {
					type: "server",
					message: errorUserWithExistEmailRegistration,
				});
			} else if (
				isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				return router.push(MainPath.ServerError);
			}
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
