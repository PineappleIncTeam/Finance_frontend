import axios from "axios";

import { IChangingUserProfilePasswordRequest } from "../../../types/api/PersonalAccount";

import { setNewPasswordEndPoint } from "../auth/apiConstants";

export const changeUserProfilePassword = async ({ baseUrl, data }: IChangingUserProfilePasswordRequest) => {
	return await axios(`${baseUrl}/${setNewPasswordEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
