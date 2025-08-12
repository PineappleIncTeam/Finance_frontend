"use client";

import { useEffect } from "react";

import { initAxiosInterceptor } from "../../../services/axios/token.interceptor";

const AxiosInterceptorInitElement = () => {
	useEffect(() => {
		initAxiosInterceptor();
	}, []);

	return null;
};

export default AxiosInterceptorInitElement;
