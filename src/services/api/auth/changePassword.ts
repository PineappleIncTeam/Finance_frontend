import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { IChangePasswordPayload } from "../../../types/api/PersonalAccount";

import { setPasswordEndpoint } from "./apiConstants";

export const changePassword = async (payload: IChangePasswordPayload) => {
	const baseUrl = getCorrectBaseUrl();
	const endpoint = `${baseUrl}/${setPasswordEndpoint}`;
	return axios.post(endpoint, payload, {
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	});
};
