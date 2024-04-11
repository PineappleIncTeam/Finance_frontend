import axios from "axios";

import { ISignupUserData } from "../../../types/api/Auth";
import { URLS } from "../../../helpers/urlsAndDates";

export const signupUser = async (signupData: ISignupUserData) => {
	return await axios.post(URLS.registration, signupData);
};
