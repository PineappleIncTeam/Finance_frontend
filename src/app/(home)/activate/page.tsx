"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { TMessageModal } from "../../../types/components/ComponentsTypes";
import { IUserValidationResponse } from "../../../types/api/Auth";
import Spinner from "../../../ui/spinner/spinner";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { setUserActivation } from "../../../services/api/auth/setUserActivation";
import { MainPath } from "../../../services/router/routes";

import logo from "../../../assets/pages/activate/logo.webp";
import warning from "../../../assets/pages/activate/warning.svg";
import activationBgImg from "../../../assets/pages/activate/activation-bg-img.svg";
import warningBgImg from "../../../assets/pages/activate/warning-bg-img.svg";
import Button from "../../../ui/Button/Button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./activate.module.scss";

const Activate = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [load, setLoad] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

	const interval = 1000;
	const successMessageTitle = "Добро пожаловать!";
	const successMessageDescription = "Начните планировать свои финансы с нами прямо сейчас";
	const warningMessageTitle = "Неверный код активации";
	const warningMessageDescription = "Попробуйте зарегистрироваться еще раз";
	const notificationMessageTitle = "Ваша запись уже активирована";
	const notificationMessageDescription = "Вы можете продолжить работу в приложении";

	const [messageTitle, setMessageTitle] = useState<string>(successMessageTitle);
	const [messageDescription, setMessageDescription] = useState<string>(successMessageDescription);
	const [messageLogo, setMessageLogo] = useState(logo);
	const [backgroundImage, setBackgroundImage] = useState(activationBgImg.src);

	enum ModalMessageTypes {
		success = "success",
		warning = "warning",
		notification = "notification",
	}

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		if (!uid || !token) {
			setLoad(true);
			return;
		}

		const activateUser = async () => {
			try {
				const isLocalhost =
					window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);

				if (baseUrl && !isLocalhost && uid && token) {
					const userData = { uid, token };
					setLoad(true);
					const response: AxiosResponse<IUserValidationResponse> = await setUserActivation(baseUrl, userData);
					setLoad(false);

					if (response.status === axios.HttpStatusCode.Ok) {
						getMessage(ModalMessageTypes.success);
						setTimeout(() => {
							router.push(MainPath.Login);
						}, interval);
					}
				}
			} catch (error) {
				setLoad(false);

				if (
					error &&
					axios.isAxiosError(error) &&
					error.response &&
					error.response.status === axios.HttpStatusCode.Forbidden
				) {
					getMessage(ModalMessageTypes.notification);
				} else if (
					axios.isAxiosError(error) &&
					error.response &&
					error.response.status >= axios.HttpStatusCode.BadRequest &&
					error.response.status <= axios.HttpStatusCode.UnavailableForLegalReasons &&
					error.response.status !== axios.HttpStatusCode.Forbidden
				) {
					getMessage(ModalMessageTypes.warning);
				}
				if (
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
		activateUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baseUrl, router, token, uid]);

	const getMessage = (message: TMessageModal) => {
		switch (message) {
			case "success":
				setMessageLogo(logo);
				setMessageTitle(successMessageTitle);
				setMessageDescription(successMessageDescription);
				setBackgroundImage(activationBgImg.src);
				break;
			case "warning":
				setMessageLogo(warning);
				setMessageTitle(warningMessageTitle);
				setMessageDescription(warningMessageDescription);
				setBackgroundImage(warningBgImg.src);
				break;
			case "notification":
				setMessageLogo(logo);
				setMessageTitle(notificationMessageTitle);
				setMessageDescription(notificationMessageDescription);
				setBackgroundImage(activationBgImg.src);
				break;
		}
	};

	const messageElement = () => {
		return (
			<div className={styles.message}>
				<div className={styles.logo}>
					<Image src={messageLogo} alt="иконка" className={styles.icon} />
				</div>
				<div className={styles.title}>{messageTitle}</div>
				<div className={styles.description}>{messageDescription}</div>
				{messageTitle === warningMessageTitle && (
					<Button
						variant={ButtonType.Outlined}
						onClick={() => router.push(MainPath.SignUp)}
						className={styles.registerButton}
						isLarge>
						Регистрация
					</Button>
				)}
			</div>
		);
	};

	return (
		<div
			className={styles.activationPageWrapper}
			style={{ backgroundImage: `url(${backgroundImage})` }}
			onClick={() => router.push(MainPath.Login)}
			role="button">
			<div className={styles.backgroundWrapper}>
				<div className={styles.messageWrapper} onClick={(e) => e.stopPropagation()} role="button">
					{load ? <Spinner /> : messageElement()}
				</div>
			</div>
		</div>
	);
};

export default Activate;
