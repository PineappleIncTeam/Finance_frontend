import axios from "axios";

import { getStatisticXlsFileEndpoint } from "../auth/apiConstants";
import { IStatisticFilePayload } from "../../../types/pages/Analytics";

export const getStatisticXslFile = async (baseUrl: string, data: IStatisticFilePayload) => {
	return await axios(`${baseUrl}/${getStatisticXlsFileEndpoint}`, {
		method: "GET",
		params: {
			type: data.type,
			days: data.days,
		},
		responseType: "text",
		withCredentials: true,
		withTokenRefresh: true,
	});
};
