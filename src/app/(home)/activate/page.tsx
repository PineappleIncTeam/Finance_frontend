"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// eslint-disable-next-line import/named
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import logo from "../../../assets/pages/activate/logo.png";
import warning from "../../../assets/pages/activate/warning.svg";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { userActivation } from "../../../services/api/auth/userActivation";
import { IUserValidationResponse } from "../../../types/api/Auth";

import { MainPath } from "../../../services/router/routes";

import { TMessageModal } from "../../../types/components/ComponentsTypes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import Spinner from "../../../ui/spinner/spinner";

import style from "./activate.module.scss";

const Activate = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [message, setMessage] = useState<TMessageModal>("success");
	const [load, setLoad] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const interval = 1000;
	const successMessageTitle = "Добро пожаловать!";
	const successMessageDescrition = "Начните планировать свои финансы с нами прямо сейчас";
	const warningMessageTitle = "Неверный код активации";
	const warningMessageDescription = "Попробуйте зарегистрироваться еще раз";
	const notificationMessageTitle = "Ваша запись уже активирована";
	const notificationMessageDescription = "Вы можете продолжить работу в приложении";
	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

	const [messageTitle, setMessageTitle] = useState<string>(successMessageTitle);
	const [messageDescription, setMessageDescription] = useState<string>(successMessageDescrition);
	const [messageLogo, setMessageLogo] = useState(logo);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		const activateUser = async () => {
			try {
				const isLocalhost =
					window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);

				if (baseUrl && !isLocalhost && uid && token) {
					const userData = { uid, token };
					setLoad(true);
					const response: AxiosResponse<IUserValidationResponse> = await userActivation(baseUrl, userData);
					setLoad(false);

					if (response.status === HttpStatusCode.Ok) {
						setMessage("success");
						setTimeout(() => {
							router.push(MainPath.Login);
						}, interval);
					}
				}
			} catch (error) {
				setLoad(false);
				if (
					isAxiosError(error) &&
					error.response &&
					error.response.status &&
					error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
					error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
				) {
					return router.push(MainPath.ServerError);
				}

				if (error && isAxiosError(error) && error.response && error.response.status === HttpStatusCode.Forbidden) {
					getMessage("warning");
				} else if (
					isAxiosError(error) &&
					error.response &&
					error.response.status >= HttpStatusCode.BadRequest &&
					error.response.status <= HttpStatusCode.UnavailableForLegalReasons
				) {
					setMessage("notification");
				}
			}
			getMessage(message);
		};
		activateUser();
	}, [baseUrl, message, router, token, uid]);

	const getMessage = (message: TMessageModal) => {
		switch (message) {
			case "success":
				setMessageLogo(logo);
				setMessageTitle(successMessageTitle);
				setMessageDescription(successMessageDescrition);
				break;
			case "warning":
				setMessageLogo(warning);
				setMessageTitle(warningMessageTitle);
				setMessageDescription(warningMessageDescription);
				break;
			case "notification":
				setMessageLogo(logo);
				setMessageTitle(notificationMessageTitle);
				setMessageDescription(notificationMessageDescription);
				break;
		}
	};

	const messageElement = () => {
		return (
			<div className={style.message}>
				<div className={style.logo}>
					<Image src={messageLogo} alt="иконка" className={style.icon} />
				</div>
				<div className={style.title}>{messageTitle}</div>
				<div className={style.description}>{messageDescription}</div>
			</div>
		);
	};

	return (
		<div className={style.wrapper}>
			<div className={style.messageWrapper}>{load ? <Spinner /> : messageElement()}</div>
		</div>
	);
};

export default Activate;
