import axios from "axios";

import { TLoginData } from "../../../types/api/Auth";
import { URLS } from "../../../helpers/urlsAndDates";

export const loginUser = async (loginData: TLoginData) => {
	return await axios.post(URLS.authorisation, loginData);
};
