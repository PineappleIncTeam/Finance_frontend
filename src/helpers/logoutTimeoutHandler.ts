import { useRouter } from "next/navigation";

import axios from "axios";

import { AuthTypes } from "../types/pages/Authorization";
import { baseLogoutUser } from "../services/api/auth/baseLogoutUser";
import { MainPath } from "../services/router/routes";

import { ApiResponseCode } from "./apiResponseCode";

export default function HandleLogout(url: string | undefined) {
	const router = useRouter();

	const request = async () => {
		try {
			if (url) {
				const authType: AuthTypes = await ((localStorage.getItem("authType") as AuthTypes) || AuthTypes.baseAuth);

				if (authType === AuthTypes.baseAuth) {
					const response = await baseLogoutUser(url);
					if (response.status === axios.HttpStatusCode.Ok) {
						await localStorage.removeItem("authType");

						router.push(MainPath.Main);
					}
				} else {
					// vk auth logout
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.BadRequest &&
				error.response.status < axios.HttpStatusCode.InternalServerError
			) {
				router.push(MainPath.Main);
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};
	return { request };
}
