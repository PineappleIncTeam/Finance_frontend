import axios from "axios";

import { IBaseURLDataRequest } from "../../../types/common/ApiTypes";
import { countiesDataEndpoint } from "../auth/apiConstants";

export const getCountiesData = async ({ baseURL }: IBaseURLDataRequest) => {
	return await axios(`${baseURL}/${countiesDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
