import { IAddCategoryIncomeForm } from "../components/ComponentsTypes";

export interface ITransactionTypePayload {
	type?: string;
}

export type IAddingCategoryIncomeForm = Omit<IAddCategoryIncomeForm, "id">;
