import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";

export const removeSavingsTarget = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${targetsEndPoint}/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
