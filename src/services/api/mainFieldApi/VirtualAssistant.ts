import { URLS } from "../../../helpers/urlsAndDates";
import { getCustomOptions } from "../../../utils/getCustomOptions";

export async function getAiAnswer(token: string) {
	return await fetch(URLS.getAiAnswer, getCustomOptions(token));
}

export async function getAiMoneyAdvice(token: string) {
	return await fetch(URLS.getSavingMoneyAdvice, getCustomOptions(token));
}

export async function getAiTaxRecommendation(token: string) {
	return await fetch(URLS.getTaxDeduction, getCustomOptions(token));
}
