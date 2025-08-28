import axios from "axios";

import { IUserData } from "../../../types/redux/StoreTypes";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { validateTokenEndpoint } from "./apiConstants";

export const getUserData = async (): Promise<{ data: IUserData }> => {
	return axios.get(`${getCorrectBaseUrl}/${validateTokenEndpoint}`, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
