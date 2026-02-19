export function calculateDaysBetween(dateArray: string[] | undefined) {
	if (!dateArray || dateArray.length < 2) {
		return 0;
	}

	const [startDate, endDate] = dateArray.map((date) => new Date(date));

	const cleanStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
	const cleanEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

	const diffTime = Math.abs(cleanEndDate.getTime() - cleanStartDate.getTime());

	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
