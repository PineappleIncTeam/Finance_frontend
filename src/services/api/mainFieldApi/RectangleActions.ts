import { URLS } from "../../../helpers/urlsAndDates";
import { getCustomOptions } from "../../../utils/getCustomOptions";

export async function getBaseCategoryList(categoryTitleURL: any, token: string) {
	return await fetch(categoryTitleURL, getCustomOptions(token));
}

export async function getOperations(url: string, token: string) {
	return await fetch(url, getCustomOptions(token));
}

export async function getBalanceInfo(startDate: any, selectDate: any, token: string) {
	return await fetch(`${URLS.balance}?date_start=${startDate}&date_end=${selectDate}`, getCustomOptions(token));
}

export async function getInputInfo(url: string, token: string) {
	return await fetch(url, getCustomOptions(token));
}
