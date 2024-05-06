export async function addDropdownCategory(categoryData: string, token: string) {
	return await fetch("URLS.createCategory", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(categoryData),
	});
}
