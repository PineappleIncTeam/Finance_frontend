import axios from "axios";

import { ILoginSuccessPayload } from "../../../types/pages/Authorization";

import { vkAuth } from "./apiConstants";

export const authVkService = async (baseUrl: string, data: ILoginSuccessPayload) => {
	return await axios(`${baseUrl}/${vkAuth}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
