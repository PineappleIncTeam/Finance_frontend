import axios, { AxiosResponse } from "axios";

import { ICurrencyItem } from "../../../types/components/ComponentsTypes";

import { currencyEndpoint } from "../auth/apiConstants";

export const fetchCurrencyRates = async (baseUrl: string): Promise<AxiosResponse<ICurrencyItem[]>> => {
	return await axios(`${baseUrl}/${currencyEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
