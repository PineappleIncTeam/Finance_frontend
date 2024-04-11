import { URLS } from "../../../helpers/urlsAndDates";
import { getCustomOptions } from "../../../utils/getCustomOptions";

export async function getIncomePercent(url: string, token: string) {
	return await fetch(url, getCustomOptions(token));
}

export async function getOutcomePercent(url: string, token: string) {
	return await fetch(url, getCustomOptions(token));
}

export async function getMoneyBox(url: string, token: string) {
	return await fetch(url, getCustomOptions(token));
}

export async function getOperationList(dataStart: string, dataEnd: string, token: string) {
	return await fetch(`${URLS.getAllOperations}?date_start=${dataStart}&date_end=${dataEnd}`, getCustomOptions(token));
}
