import { ISummaryData } from "../../../types/api/MainFieldString";

export async function sendCurrentSum(correctURL: string, summaryData: ISummaryData, token: string) {
	return fetch(correctURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(summaryData),
	});
}
