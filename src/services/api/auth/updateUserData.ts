import axios from "axios";

import { IUserData } from "../../../types/redux/StoreTypes";

import { validateTokenEndpoint } from "./apiConstants";

export const updateUserData = async (userData: Partial<IUserData>, baseURL: string) => {
	return await axios(`${baseURL}/${validateTokenEndpoint}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		data: userData,
	});
};
