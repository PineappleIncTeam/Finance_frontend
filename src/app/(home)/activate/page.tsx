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
	const [load, setLoad] = useState<boolean>(true);
	const router = useRouter();
	const searchParams = useSearchParams();
	const interval = 1000;
	const successMessageTitle = "Добро пожаловать!";
	const successMessageDescrition = "Начните планировать свои финансы с нами прямо сейчас.";
	const warningMessageTitle = "Неверный код активации";
	const warningMessageDescription = "Попробуйте зарегистрироваться еще раз";
	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

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
				if (error.status >= HttpStatusCode.BadRequest && error.status <= HttpStatusCode.UnavailableForLegalReasons) {
					setMessage("warning");
				} else if (error.status >= HttpStatusCode.InternalServerError) {
					router.push(MainPath.ServerError);
				}
			}
		};
		activateUser();
	}, [baseUrl, router, token, uid]);

	const messageElement = () => {
		return (
			<div className={style.message}>
				<div className={style.logo}>
					<Image src={message === "success" ? logo : warning} alt="иконка" className={style.icon} />
				</div>
				<div className={style.title}>{message === "success" ? successMessageTitle : warningMessageTitle}</div>
				<div className={style.description}>
					{message === "success" ? successMessageDescrition : warningMessageDescription}
				</div>
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
