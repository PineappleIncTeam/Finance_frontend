import axios, { AxiosResponse } from "axios";

import { IUserEmailDataResponse } from "../../../types/api/PersonalAccount";
import { IBaseURLDataRequest } from "../../../types/common/ApiTypes";
import { getUserEmailDataEndpoint } from "../auth/apiConstants";

export const getUserEmailData = async ({
	baseURL,
}: IBaseURLDataRequest): Promise<AxiosResponse<IUserEmailDataResponse>> => {
	return await axios(`${baseURL}/${getUserEmailDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
