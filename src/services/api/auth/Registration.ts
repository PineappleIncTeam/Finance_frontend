import axios from "axios";

import { ISignUpForm } from "../../../types/components/ComponentsTypes";

import { baseURL, signupEndpoint } from "./apiConstants";

export const registration = async (userData: ISignUpForm) => {
	return await axios(`${baseURL}/${signupEndpoint}`, {
		method: "POST",
		data: userData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
