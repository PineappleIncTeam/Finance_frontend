import { createAction } from "@reduxjs/toolkit";

import { ICountryData, IFetchUserDataResponse } from "../../api/PersonalAccount";
import { IBaseURLDataRequest, ICommonErrorResponse } from "../../common/ApiTypes";
import { IReportsCategoriesDataState, IReportsStatisticsDataState } from "../StateTypes";

export const userDataActions = {
	pending: createAction<IBaseURLDataRequest>("userData/fetchPending"),
	fulfilled: createAction<IFetchUserDataResponse>("userData/fetchFulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error | ICommonErrorResponse>("userData/fetchRejected"),
};

export const countriesDataActions = {
	pending: createAction<IBaseURLDataRequest>("countriesData/fetchPending"),
	fulfilled: createAction<ICountryData[]>("countriesData/fetchFulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error | ICommonErrorResponse>("countriesData/fetchRejected"),
};

export const balanceActions = {
	pending: createAction<IBaseURLDataRequest>("balance/pending"),
	fulfilled: createAction<number>("balance/fulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error | ICommonErrorResponse>("balance/rejected"),
};

export const reportsStatisticsActions = {
	pending: createAction<IBaseURLDataRequest>("reportsStatistics/pending"),
	fulfilled: createAction<IReportsStatisticsDataState>("reportsStatistics/fulfilled"),
	rejected: createAction<string>("reportsStatistics/rejected"),
};

export const reportCategoriesActions = {
	pending: createAction<IBaseURLDataRequest>("reportCategories/pending"),
	fulfilled: createAction<IReportsCategoriesDataState>("reportCategories/fulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error | ICommonErrorResponse>("reportCategories/rejected"),
};
