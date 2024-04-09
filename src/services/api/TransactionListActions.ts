import { ICashData } from "../../types/api/TransactionListActions";
import { URLS } from "../../helpers/urlsAndDates";
import { getCustomOptions } from "../../utils/getCustomOptions";
import { getUpdateOptions } from "../../utils/getUpdateOptions";

export async function deleteIncomeCash(id: any, token: string) {
	return await fetch(`${URLS.deleteIncomeCash}${id}`, getCustomOptions(token));
}

export async function deleteOutcomeCash(id: any, token: string) {
	return await fetch(`${URLS.deleteOutcomeCash}${id}`, getCustomOptions(token));
}

export async function deleteMoneyBoxCash(id: any, token: string) {
	return await fetch(`${URLS.deleteMoneyBoxCash}${id}`, getCustomOptions(token));
}

export async function updateIncomeCash(cashData: ICashData, id: any, token: string) {
	return await fetch(`${URLS.updateIncomeCash}${id}`, getUpdateOptions(cashData, token));
}

export async function updateOutcomeCash(cashData: ICashData, id: any, token: string) {
	return await fetch(`${URLS.updateOutcomeCash}${id}`, getUpdateOptions(cashData, token));
}

export async function updateMoneyBoxCash(cashData: ICashData, id: any, token: string) {
	return await fetch(`${URLS.updateMoneyBoxCash}${id}`, getUpdateOptions(cashData, token));
}
