"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { env } from "next-runtime-env";
import * as VKID from "@vkid/sdk";

import { useAppDispatch } from "../../../services/redux/hooks/useAppDispatch";

import { AuthTypes, IPkceCodeSet, IVKLoginSuccessPayload, IVkAuthRequest } from "../../../types/pages/Authorization";
import { ICorrectSignInForm, ISignInForm } from "../../../types/components/ComponentsTypes";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import CustomCheckbox from "../../../ui/checkBox/checkBox";
import Button from "../../../ui/Button/Button";
import InviteModal from "../inviteModal/inviteModal";
import { emailPattern, errorDataLogOn, errorProfileActivation, passwordPattern } from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { InputTypeList } from "../../../helpers/Input";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { loginUser } from "../../../services/api/auth/loginUser";
import { setAutoLoginStatus } from "../../../services/redux/features/autoLogin/autoLoginSlice";
import { authApiVkService } from "../../../services/api/auth/authVkService";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { generatePkceChallenge, generateState } from "../../../utils/generateAuthTokens";

import styles from "./signInForm.module.scss";

export default function SignInForm() {
	const [baseUrl, setBaseUrl] = useState<string>("");
	const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
	const [pkceCodeSet, setPkceCodeSet] = useState<IPkceCodeSet>();

	const dispatch = useAppDispatch();

	const {
		formState: { errors },
		setError,
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

	const vkAppId = Number(env("NEXT_PUBLIC_VK_APP_ID") ?? 0);

	const authCurtainRenderObj = {
		appName: "freenance-app",
		scheme: VKID.Scheme.LIGHT,
		lang: VKID.Languages.RUS,
		indent: { top: 30, right: 50 },
	};

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		(async () => {
			await setPkceCodeSet(await generatePkceChallenge());
		})();
	}, []);

	VKID.Config.init({
		app: vkAppId ?? 0,
		redirectUrl: `${getCorrectBaseUrl()}${UserProfilePath.ProfitMoney}`,
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
				const response = await authApiVkService(baseUrl, authData);
				if (response.status === axios.HttpStatusCode.Ok) {
					localStorage.setItem("authType", AuthTypes.vkServiceAuth);

					await router.push(UserProfilePath.ProfitMoney);
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

	const onSubmit = async (data: ISignInForm) => {
		try {
			if (baseUrl && data.password) {
				const correctUserData: ICorrectSignInForm = {
					email: data.email ?? "",
					password: data.password,
				};
				await loginUser(baseUrl, correctUserData);
				setIsInviteModalOpen(true);
				localStorage.setItem("authType", AuthTypes.baseAuth);

				if (data.isAutoAuth) {
					dispatch(setAutoLoginStatus(data.isAutoAuth));
				}
			}
		} catch (error) {
			if (isAxiosError(error) && error?.response?.status === axios.HttpStatusCode.BadRequest) {
				setError("email", {
					type: "server",
					message: errorDataLogOn,
				});
			} else if (isAxiosError(error) && error?.response?.status === axios.HttpStatusCode.Unauthorized) {
				setError("email", {
					type: "server",
					message: errorProfileActivation,
				});
			} else if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};

	const handleModalClose = () => {
		setIsInviteModalOpen(false);
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
					<button
						className={styles.signInFormContainer__auth_link}
						type={InputTypeList.Button}
						onClick={() => handleOpenAuthCurtain()}>
						Вконтакте
					</button>
				</p>
			</div>
			{isInviteModalOpen && <InviteModal isOpen={isInviteModalOpen} onClose={handleModalClose} />}
		</form>
	);
}
