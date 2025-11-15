import axios from "axios";

import { getUserBalanceEndPoint } from "../auth/apiConstants";

export const getUserBalance = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${getUserBalanceEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
