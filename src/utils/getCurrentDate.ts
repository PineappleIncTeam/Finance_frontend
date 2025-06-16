export const getCurrentDate = (endDate: number) => {
	return new Date().toISOString().slice(0, endDate);
};
