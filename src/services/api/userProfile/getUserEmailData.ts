import axios, { AxiosResponse } from "axios";

import { IGettingUserDataRequest, IUserEmailDataResponse } from "../../../types/api/PersonalAccount";

import { getUserEmailDataEndpoint } from "../auth/apiConstants";

export const getUserEmailData = async ({
	baseURL,
}: IGettingUserDataRequest): Promise<AxiosResponse<IUserEmailDataResponse>> => {
	return await axios(`${baseURL}/${getUserEmailDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
