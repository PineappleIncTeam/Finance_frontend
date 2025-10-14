import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";

export const returnMoneyAccount = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${targetsEndPoint}/${id}/return_money/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
