import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { IChangePasswordPayload } from "../../../types/api/PersonalAccount";

import { setNewPasswordEndPoint } from "./apiConstants";

export const changePassword = async (payload: IChangePasswordPayload) => {
	const baseUrl = getCorrectBaseUrl();
	const endpoint = `${baseUrl}/${setNewPasswordEndPoint}`;
	return axios.post(endpoint, payload, {
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	});
};
