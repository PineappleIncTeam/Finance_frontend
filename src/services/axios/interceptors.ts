"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { TVoidCallback } from "../../types/common/CiCdTypes";
import { refreshToken } from "../api/auth/refreshToken";
import { logoutUser } from "../api/auth/Logout";
import { MainPath } from "../router/routes";
import { getCorrectBaseUrl } from "../../utils/baseUrlConverter";

let isRefreshing: boolean = false;
let failedRequestsQueue: TVoidCallback[] = [];

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const processQueue = (_error?: Error) => {
	failedRequestsQueue.forEach((callback) => callback());
	failedRequestsQueue = [];
};

export const setupAxiosInterceptors = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [baseUrl, setBaseUrl] = useState<string>();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		return config;
	});

	axios.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config;

			if (!originalRequest) {
				return Promise.reject(error);
			}

			if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
				if (isRefreshing) {
					// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
					return new Promise((resolve, _reject) => {
						failedRequestsQueue.push(() => {
							resolve(axios(originalRequest));
						});
					});
				}

				isRefreshing = true;

				try {
					await refreshToken(baseUrl);

					processQueue();

					return axios(originalRequest);
				} catch (refreshError) {
					processQueue(refreshError as Error);
					await logoutUser(baseUrl);
					window.location.href = MainPath.Login;
					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			}

			return Promise.reject(error);
		},
	);
};
