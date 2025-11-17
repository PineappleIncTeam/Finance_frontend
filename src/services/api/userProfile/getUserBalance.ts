import axios from "axios";

import { IBaseURLDataRequest } from "../../../types/common/ApiTypes";
import { getUserBalanceEndPoint } from "../auth/apiConstants";

export const getUserBalance = async ({ baseURL }: IBaseURLDataRequest) => {
	return await axios(`${baseURL}/${getUserBalanceEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
