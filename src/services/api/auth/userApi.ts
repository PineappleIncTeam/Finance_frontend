import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { validateTokenEndpoint } from "./apiConstants";

export interface IUserData {
	name: string;
	email: string;
	nickname: string;
	country: string;
	gender: string;
}

export const getUserData = async (): Promise<{ data: IUserData }> => {
	return axios.get(`${getCorrectBaseUrl}/${validateTokenEndpoint}`, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};

export const updateUserData = async (userData: Partial<IUserData>): Promise<{ data: IUserData }> => {
	return axios.patch(`${getCorrectBaseUrl}/${validateTokenEndpoint}`, userData, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
