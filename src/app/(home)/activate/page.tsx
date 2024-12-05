"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// eslint-disable-next-line import/named
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";

import { useRouter } from "next/navigation";

import logo from "../../../assets/pages/activate/logo.png";
import warning from "../../../assets/pages/activate/warning.svg";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { userActivation } from "../../../services/api/auth/userActivation";
import { IUserValidationResponse } from "../../../types/api/Auth";

import { MainPath } from "../../../services/router/routes";

import { messageModal } from "../../../types/components/ComponentsTypes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import style from "./activate.module.scss";

const Activate = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [message, setMessage] = useState<messageModal>("success");
	const router = useRouter();
	const interval = 1000;
	const successMessageTitle = "Добро пожаловать!";
	const successMessageDescrition = "Начните планировать свои финансы с нами прямо сейчас.";
	const warningMessageTitle = "Неверный код активации";
	const warningMessageDescription = "Попробуйте зарегистрироваться еще раз";

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		try {
			const isLocalhost =
				window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);

			if (baseUrl && !isLocalhost) {
				userActivation(baseUrl).then((response: AxiosResponse<IUserValidationResponse>) => {
					if (response.status === HttpStatusCode.Ok) {
						setMessage("success");
						setTimeout(() => {
							router.push(MainPath.Login);
						}, interval);
					}
					if (
						response.status >= HttpStatusCode.BadRequest &&
						response.status <= HttpStatusCode.UnavailableForLegalReasons
					) {
						setMessage("warning");
					}
					if (response.status >= HttpStatusCode.InternalServerError) {
						router.push(MainPath.ServerError);
					}
				});
			}
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	}, [baseUrl, router]);

	return (
		<div className={style.wrapper}>
			<div className={style.messageWrapper}>
				<div className={style.message}>
					<div className={style.logo}>
						<Image src={message === "success" ? logo : warning} alt="иконка" className={style.icon} />
					</div>
					<div className={style.title}>{message === "success" ? successMessageTitle : warningMessageTitle}</div>
					<div className={style.description}>
						{message === "success" ? successMessageDescrition : warningMessageDescription}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Activate;
