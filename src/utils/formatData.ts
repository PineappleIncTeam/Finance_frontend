export function formatDate(dateStr: string) {
	const [day, month, year] = dateStr
		.split(".")
		.map((part, index) => (index === 2 ? parseInt("20" + part, 10) : parseInt(part, 10)));

	const date = new Date(year, month - 1, day);

	const months = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

	const monthName = months[date.getMonth()];

	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${day} ${monthName} ${year}, ${dayOfWeek}`;
}

export function formatMoney(num: number, digits: number = 2) {
	return num.toLocaleString("ru-RU", {
		minimumFractionDigits: digits,
		maximumFractionDigits: 2,
		style: "currency",
		currency: "RUB",
	});
}
