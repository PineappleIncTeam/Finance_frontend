import axios from "axios";

import { ILoginSuccessPayload } from "../../../types/pages/Authorization";

import { vkAuthorisationEndPoint } from "./apiConstants";

export const authApiVkService = async (baseUrl: string, data: ILoginSuccessPayload) => {
	return await axios(`${baseUrl}/${vkAuthorisationEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
