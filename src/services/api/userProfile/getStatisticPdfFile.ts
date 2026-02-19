import axios from "axios";

import { getStatisticPdfFileEndpoint } from "../auth/apiConstants";
import { IStatisticFilePayload } from "../../../types/pages/Analytics";

export const getStatisticPdfFile = async (baseUrl: string, data: IStatisticFilePayload) => {
	return await axios(`${baseUrl}/${getStatisticPdfFileEndpoint}`, {
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
