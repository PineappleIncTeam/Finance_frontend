import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";

export const getTargetsAll = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${targetsEndPoint}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
