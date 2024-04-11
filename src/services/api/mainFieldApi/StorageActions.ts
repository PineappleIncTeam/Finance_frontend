import { SendingIncomeToSum } from "../../../types/api/StorageActions";
import { URLS } from "../../../helpers/urlsAndDates";

export async function sendIncomeToSum(incomeData: SendingIncomeToSum, token: string) {
	return fetch(URLS.POSTincomcash, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(incomeData),
	});
}

export async function createNewCategory(token: string) {
	const newCategoryData = {
		categoryName: "Из Накоплений",
		category_type: "constant",
		income_outcome: "income",
	};

	return fetch(URLS.POSTincomcash, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(newCategoryData),
	});
}

export async function removeCategory(category: any, token: string) {
	return fetch(`${URLS.deleteCategory}${category.category_id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
	});
}
