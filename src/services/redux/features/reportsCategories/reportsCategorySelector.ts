import { RootState } from "../../index";

export const reportsCategoriesSelector = (state: RootState) => state.reportsCategories.categoriesData;

export const reportsProfitCategoriesSelector = (state: RootState) => state.reportsCategories.categoriesData.incomes;

export const reportsExpensesCategoriesSelector = (state: RootState) => state.reportsCategories.categoriesData.outcomes;

export const reportsTargetsCategoriesSelector = (state: RootState) => state.reportsCategories.categoriesData.targets;
