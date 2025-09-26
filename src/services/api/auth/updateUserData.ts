import axios from "axios";

import { IUserData } from "../../../types/redux/StoreTypes";

import { getUserDataEndpoint } from "./apiConstants";

export const updateUserData = async (data: Partial<IUserData>, baseURL: string) => {
	return await axios(`${baseURL}/${getUserDataEndpoint}`, {
		method: "PATCH",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
