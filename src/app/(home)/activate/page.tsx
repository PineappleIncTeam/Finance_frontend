"use client";

import { useEffect, useState } from "react";

import { AxiosResponse, HttpStatusCode } from "axios";

import { useRouter } from "next/navigation";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { userActivation } from "../../../services/api/auth/userActivation";
import { IUserValidationResponse } from "../../../types/api/Auth";

import { MainPath } from "../../../services/router/routes";

import style from "./activate.module.scss";

const Activate = () => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const router = useRouter();

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
						return router.push(MainPath.Login);
					}
					if (
						response.status >= HttpStatusCode.BadRequest &&
						response.status <= HttpStatusCode.UnavailableForLegalReasons
					) {
						// return router.push(MainPath.Login);
					}
					if (response.status >= HttpStatusCode.InternalServerError) {
						// return router.push(MainPath.Login);
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	}, [baseUrl, router]);

	return (
		<div className={style.wrapper}>
			<div className={style.message}></div>
		</div>
	);
};

export default Activate;
