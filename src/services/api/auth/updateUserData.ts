import axios from "axios";

import { IUserData } from "../../../types/redux/StoreTypes";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { validateTokenEndpoint } from "./apiConstants";

export const updateUserData = async (userData: Partial<IUserData>): Promise<{ data: IUserData }> => {
	return axios.patch(`${getCorrectBaseUrl}/${validateTokenEndpoint}`, userData, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
