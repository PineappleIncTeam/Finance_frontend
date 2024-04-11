export function getUpdateOptions(cashData: any, token: string) {
	return {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(cashData),
	};
}
