export function getCustomOptions(token: string) {
	return {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Token ${token}`,
		},
	};
}
