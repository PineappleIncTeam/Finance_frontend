import axios, { AxiosResponse } from "axios";

import { IUserProfileDataResponse } from "../../../types/api/PersonalAccount";
import { userProfileDataEndpoint } from "../auth/apiConstants";
import { IBaseURLDataRequest } from "../../../types/common/ApiTypes";

export const getUserProfileData = async ({
	baseURL,
}: IBaseURLDataRequest): Promise<AxiosResponse<IUserProfileDataResponse>> => {
	return await axios(`${baseURL}/${userProfileDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
