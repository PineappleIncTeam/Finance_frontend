import { createAction } from "@reduxjs/toolkit";

import { ICountryData, IFetchUserDataResponse } from "../../api/PersonalAccount";
import { IBaseURLDataRequest } from "../../common/ApiTypes";

export const userDataActions = {
	pending: createAction<IBaseURLDataRequest>("userData/fetchPending"),
	fulfilled: createAction<IFetchUserDataResponse>("userData/fetchFulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error>("userData/fetchRejected"),
};

export const countriesDataActions = {
	pending: createAction<IBaseURLDataRequest>("countriesData/fetchPending"),
	fulfilled: createAction<ICountryData[]>("countriesData/fetchFulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error>("countriesData/fetchRejected"),
};

export const balanceActions = {
	pending: createAction<IBaseURLDataRequest>("balance/pending"),
	fulfilled: createAction<number>("balance/fulfilled"),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rejected: createAction<any | unknown | Error>("balance/rejected"),
};
