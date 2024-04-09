import { IArchiveCategoryData, IDropdownCategoryData } from "../../types/api/Dropdown";
import { URLS } from "../../helpers/urlsAndDates";

export async function addDropdownCategory(categoryData: IDropdownCategoryData, token: string) {
	return await fetch(URLS.createCategory, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(categoryData),
	});
}

export async function deleteDropdownCategory(categoryId: any, token: string) {
	return await fetch(`${URLS.deleteCategory}${categoryId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
	});
}

export async function sendCategoryToArchive(archiveCategoryData: IArchiveCategoryData, categoryId: any, token: string) {
	return await fetch(`${URLS.deleteCategory}${categoryId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(archiveCategoryData),
	});
}
