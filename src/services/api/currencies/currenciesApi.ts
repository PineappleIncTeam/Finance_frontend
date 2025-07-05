import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

interface ICurrencyItem {
	title: string;
	value: number;
}

export interface ICurrencyRates {
	dollar: number;
	euro: number;
	crypto: number;
}

export const fetchCurrencyRates = async (): Promise<ICurrencyRates> => {
	const baseUrl = getCorrectBaseUrl();

	try {
		const response = await axios.get<ICurrencyItem[]>(`${baseUrl}/currency`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		const rates: Record<string, number> = {};
		response.data.forEach((item) => {
			rates[item.title.toLowerCase()] = item.value;
		});

		return {
			dollar: rates.usd || 0,
			euro: rates.eur || 0,
			crypto: rates.btc || 0,
		};
	} catch (error) {
		console.error("Currency fetch error:", error);
		return {
			dollar: 0,
			euro: 0,
			crypto: 0,
		};
	}
};
