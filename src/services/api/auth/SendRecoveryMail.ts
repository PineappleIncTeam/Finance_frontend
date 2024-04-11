import axios from "axios";

import { TRecoveryData } from "../../../types/api/Auth";
import { URLS } from "../../../helpers/urlsAndDates";

export const sendRecoveryMail = async (recoveryData: TRecoveryData) => {
	return await axios.post(URLS.resetPassword, recoveryData);
};
