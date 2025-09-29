import axios, { AxiosResponse } from "axios";

import { IGettingUserDataRequest, IUserProfileDataResponse } from "../../../types/api/PersonalAccount";
import { userProfileDataEndpoint } from "../auth/apiConstants";

export const getUserProfileData = async ({
	baseURL,
}: IGettingUserDataRequest): Promise<AxiosResponse<IUserProfileDataResponse>> => {
	return await axios(`${baseURL}/${userProfileDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
