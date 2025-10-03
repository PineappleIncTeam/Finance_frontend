import axios from "axios";

import { TChangeUserProfileDataRequest } from "../../../types/api/PersonalAccount";

import { userProfileDataEndpoint } from "../auth/apiConstants";

export const updateUserProfileData = async (data: TChangeUserProfileDataRequest, baseURL: string) => {
	return await axios(`${baseURL}/${userProfileDataEndpoint}`, {
		method: "PATCH",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
