import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { setPasswordEndpoint } from "./apiConstants";

export const changePassword = async (payload: { oldPassword: string; newPassword: string }) => {
	const baseUrl = getCorrectBaseUrl();
	const endpoint = `${baseUrl}/${setPasswordEndpoint}`;
	return axios.post(endpoint, payload, {
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	});
};
