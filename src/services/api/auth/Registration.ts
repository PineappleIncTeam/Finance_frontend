import axios from "axios";

import { ISignUpForm } from "../../../types/components/ComponentsTypes";

import { signupEndpoint } from "./apiConstants";

export const registration = async (baseUrl: string, userData: ISignUpForm) => {
	return await axios(`${baseUrl}/${signupEndpoint}`, {
		method: "POST",
		data: userData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
