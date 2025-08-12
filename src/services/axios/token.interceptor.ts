import axios from "axios";

import { IFailedOriginalRequest, IPromiseCallback } from "../../types/axios/commonTypes";
import { refreshToken } from "../api/userProfile/refreshToken";
import { logoutUser } from "../api/auth/Logout";
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
			error.response?.status === axios.HttpStatusCode.Unauthorized &&
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
				await refreshToken(originalRequest.baseURL);
				processQueue();

				return axios(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as Error);
				await logoutUser(originalRequest.baseURL);

				if (typeof window !== "undefined") {
					window.location.href = MainPath.Login;
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
