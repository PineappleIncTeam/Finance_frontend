import axios from "axios";

import { getFiveOperationsEndPoint } from "../auth/apiConstants";

export const GetFiveOperations = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${getFiveOperationsEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
