import { ISavingsTransaction } from "../types/components/ComponentsTypes";

export const savingsTransactions: ISavingsTransaction[] = [
	{
		date: "25 января 2024, Пт",
		// secondDate: "25.01.24, Пт",
		categories: "Квартира",
		amount: parseAmount("+ 30 000.00 ₽"),
	},
	{
		date: "24 января 2024, Чт",
		// secondDate: "24.01.24, Чт",
		categories: "Квартира",
		amount: parseAmount("+ 105 000.00 ₽"),
	},
	{
		date: "20 сентября 2024, Ср",
		// secondDate: "20.09.24, Ср",
		categories: "Отпуск 2024",
		amount: parseAmount("+ 10 000.00 ₽"),
	},
	{
		date: "20 сентября 2024, Ср",
		// secondDate: "20.09.24, Ср",
		categories: "Машина",
		amount: parseAmount("+ 10 000.00 ₽"),
	},

	{
		date: "14 августа 2024, Пн",
		// secondDate: "14.08.24, Пн",
		categories: "Обучение ребенка",
		amount: parseAmount("+ 2 000.00 ₽"),
	},
];

function parseAmount(amountStr: string): number {
	const amount = amountStr.replace(/[^\d.-]/g, ""); // Убираем все символы, кроме цифр и знака "-"
	return parseFloat(amount); // Преобразуем строку в число
  }
