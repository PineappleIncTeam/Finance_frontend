"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosResponse, isAxiosError } from "axios";
import Link from "next/link";
import * as VKID from "@vkid/sdk";
import * as Sentry from "@sentry/nextjs";

import { sendErrorToMonitoring } from "../../../hooks/useGlobalErrorHandler";

import { useActions } from "../../../services/redux/hooks";
import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";

import { AuthTypes, IPkceCodeSet, IVKLoginSuccessPayload, IVkAuthRequest } from "../../../types/pages/Authorization";
import { ICorrectSignInForm, ISignInForm } from "../../../types/components/ComponentsTypes";
import { IVKServiceDataResponse } from "../../../types/api/Auth";
import { IUserDataState } from "../../../types/redux/StateTypes";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import CustomCheckbox from "../../../ui/checkBox/checkBox";
import Button from "../../../ui/Button/Button";
import InviteModal from "../inviteModal/inviteModal";

import {
	emailPattern,
	errorDataLogOn,
	errorProfileActivation,
	errorTooManyRequests,
	passwordPattern,
} from "../../../helpers/authConstants";
import { PrivateRouteErrorModal } from "../errorHandlerElements/privateRouteErrorModal/privateRouteErrorModal";
import { formHelpers } from "../../../utils/formHelpers";
import { InputTypeList } from "../../../helpers/Input";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { loginUser } from "../../../services/api/auth/loginUser";
import { authApiVkService } from "../../../services/api/auth/authVkService";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { generatePkceChallenge, generateState } from "../../../utils/generateAuthTokens";
import { ruCountryNumber } from "../../../helpers/userDataConstants";
import { mockBaseUrl } from "../../../mocks/envConsts";

import styles from "./signInForm.module.scss";

export default function SignInForm() {
	const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
	const [isPrivateRouteErrorModalOpen, setIsPrivateRouteErrorModalOpen] = useState<boolean>(true);
	const [pkceCodeSet, setPkceCodeSet] = useState<IPkceCodeSet>();
	const [isTooManyRequestsError, setIsTooManyRequestsError] = useState<boolean>(false);

	const [initAttempts, setInitAttempts] = useState<number>(0);
	const [isVKIDInitialized, setIsVKIDInitialized] = useState<boolean>(false);
	const timeoutInitRef = useRef<NodeJS.Timeout | null>(null);

	const { setUserData, setAutoLoginStatus } = useActions();
	const searchParams = useSearchParams();

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_VK_APP_ID"]);

	const isPrivateRoute = Boolean(searchParams.get("isPrivateRoute"));

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

	const maxInitRetries = 5;
	const retryDelay = 200;

	const vkAppId = Number(getSafeEnvVar("NEXT_PUBLIC_VK_APP_ID", "12354678"));
	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);

	const authCurtainRenderObj = {
		appName: "freenance-app",
		scheme: VKID.Scheme.LIGHT,
		lang: VKID.Languages.RUS,
		indent: { top: 30, right: 50 },
	};

	const interval: number = 120000;

	useEffect(() => {
		(async () => {
			await setPkceCodeSet(await generatePkceChallenge());
		})();
	}, []);

	useEffect(() => {
		if (isVKIDInitialized) {
			return;
		}

		const attemptInitialization = () => {
			if (process.env.NODE_ENV === "production" && initAttempts >= maxInitRetries) {
				const signinAttemptsError: Sentry.Exception = {
					type: "Signin attempts",
					value: "Running out signin attempts",
					module: "SigninForm",
				};
				sendErrorToMonitoring(signinAttemptsError);

				return;
			}

			try {
				VKID.Config.init({
					app: vkAppId ?? 0,
					redirectUrl: `${baseUrl}${UserProfilePath.ProfitMoney}`,
					state: generateState(),
					codeChallenge: String(pkceCodeSet?.code_challenge ?? ""),
					scope: "email phone",
					responseMode: VKID.ConfigResponseMode.Callback,
					mode: VKID.ConfigAuthMode.InNewWindow,
				});

				setIsVKIDInitialized(true);
				if (timeoutInitRef.current) {
					clearTimeout(timeoutInitRef.current);
				}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error: unknown) {
				timeoutInitRef.current = setTimeout(() => {
					setInitAttempts((prevAttempts) => prevAttempts + 1);
				}, retryDelay);
			}
		};

		attemptInitialization();

		return () => {
			if (timeoutInitRef.current) {
				clearTimeout(timeoutInitRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initAttempts, isVKIDInitialized]);

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

					setUserData(userData);
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
			if (!isTooManyRequestsError && baseUrl && data.password) {
				const correctUserData: ICorrectSignInForm = {
					email: data.email ?? "",
					password: data.password,
				};
				await loginUser(baseUrl, correctUserData);
				setIsInviteModalOpen(true);
				localStorage.setItem("authType", AuthTypes.baseAuth);

				if (data.isAutoAuth) {
					setAutoLoginStatus(data.isAutoAuth);
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
			} else if (isAxiosError(error) && error?.response?.status === axios.HttpStatusCode.TooManyRequests) {
				setError("email", {
					type: "server",
					message: errorTooManyRequests,
				});
				setIsTooManyRequestsError(true);
				setTimeout(() => {
					setIsTooManyRequestsError(false);
				}, interval);
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

	const handlePrivateRouteModalClose = () => {
		setIsPrivateRouteErrorModalOpen(false);
		router.push(MainPath.Login);
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
				<Button
					variant={ButtonType.Notification}
					disabled={isTooManyRequestsError}
					type={InputTypeList.Submit}
					className={styles.button}>
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
			{isPrivateRoute && (
				<PrivateRouteErrorModal isOpen={isPrivateRouteErrorModalOpen} closeModal={handlePrivateRouteModalClose} />
			)}
		</form>
	);
}
