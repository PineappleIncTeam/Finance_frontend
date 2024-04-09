import axios from "axios";

import { ChangingUserPassword } from "../../../types/api/Auth";
import { URLS } from "../../../helpers/urlsAndDates";

export const changeUserPassword = async (userData: ChangingUserPassword) => {
	return await axios.post(URLS.resetPasswordConfirm, userData);
};
