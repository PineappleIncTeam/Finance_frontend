import axios from "axios";

import { IVKLoginSuccessPayload } from "../../../types/pages/Authorization";

import { vkAuthorisationEndPoint } from "./apiConstants";

export const authApiVkService = async (baseUrl: string, data: IVKLoginSuccessPayload) => {
	return await axios(`${baseUrl}/${vkAuthorisationEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
