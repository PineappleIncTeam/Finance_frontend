import axios from "axios";

import { getStatisticPdfFileEndpoint } from "../auth/apiConstants";
import { IStatisticFilePayload } from "../../../types/pages/Analytics";

export const getStatisticPdfFile = async (baseUrl: string, data: IStatisticFilePayload) => {
	return await axios(`${baseUrl}/${getStatisticPdfFileEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			type: data.type,
			days: data.days,
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
