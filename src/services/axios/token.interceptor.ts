import axios from "axios";

import { IFailedOriginalRequest, IPromiseCallback } from "../../types/axios/commonTypes";
import { AuthTypes } from "../../types/pages/Authorization";
import { refreshToken } from "../api/auth/refreshToken";
import { logoutUser } from "../api/auth/logoutUser";
import { MainPath } from "../router/routes";

declare module "axios" {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface AxiosRequestConfig {
		withTokenRefresh?: boolean;
	}
}

let isRefreshing = false;
let failedQueue: Array<IPromiseCallback> = [];

const processQueue = (error?: Error) => {
	failedQueue.forEach((promiseCallback) => {
		if (error) {
			promiseCallback.reject(error);
		} else {
			promiseCallback.resolve(null);
		}
	});

	failedQueue = [];
};

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest: IFailedOriginalRequest = error.config;

		if (
			error.response?.status === axios.HttpStatusCode.Forbidden &&
			originalRequest.withTokenRefresh &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => axios(originalRequest))
					.catch((error) => Promise.reject(error));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				await refreshToken(originalRequest.baseURL ?? "");
				processQueue();

				return axios(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as Error);

				try {
					const authType: AuthTypes = await ((localStorage.getItem("authType") as AuthTypes) || AuthTypes.baseAuth);

					if (authType === AuthTypes.baseAuth) {
						const response = await logoutUser(originalRequest.baseURL ?? "");
						if (response.status >= axios.HttpStatusCode.Ok && response.status < axios.HttpStatusCode.MultipleChoices) {
							window.location.href = MainPath.Login;
						}
					} else {
						// vk auth logout
					}
				} catch (error) {
					if (
						axios.isAxiosError(error) &&
						error.response &&
						error.response.status &&
						error.response.status >= axios.HttpStatusCode.BadRequest &&
						error.response.status < axios.HttpStatusCode.InternalServerError
					) {
						window.location.href = MainPath.Login;
					}
					if (
						axios.isAxiosError(error) &&
						error.response &&
						error.response.status &&
						error.response.status >= axios.HttpStatusCode.InternalServerError &&
						error.response.status < axios.HttpStatusCode.NetworkAuthenticationRequired + 1
					) {
						return (window.location.href = MainPath.ServerError);
					}
				}

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export const initAxiosInterceptor = () => {
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const v1 = "v1";
};
