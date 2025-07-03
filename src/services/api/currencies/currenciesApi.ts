import axios from "axios";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

interface ICurrencyItem {
	title: string;
	value: number;
}

export const fetchCurrencyRates = async () => {
	const response = await axios.get<ICurrencyItem[]>(`${getCorrectBaseUrl}/currency`);

	const rates: Record<string, number> = {};
	response.data.forEach((item) => {
		rates[item.title.toLowerCase()] = item.value;
	});

	return {
		dollar: rates.usd || 0,
		euro: rates.eur || 0,
		crypto: rates.btc || 0,
	};
};
