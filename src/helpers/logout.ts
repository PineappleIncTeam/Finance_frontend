import { useRouter } from "next/navigation";

import axios from "axios";

import { logoutUser } from "../services/api/auth/Logout";

import { MainPath } from "../services/router/routes";

import { ApiResponseCode } from "./apiResponseCode";

export default function HandleLogout(url: string | undefined) {
	const router = useRouter();

	const request = async () => {
		try {
			if (url) {
				const response = await logoutUser(url);
				if (response.status === axios.HttpStatusCode.Ok) {
					router.push(MainPath.Main);
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
