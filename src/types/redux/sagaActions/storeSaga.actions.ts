import { createAction } from "@reduxjs/toolkit";

import { ICountryData, IFetchUserDataResponse } from "../../api/PersonalAccount";
import { IBaseURLDataRequest } from "../../common/ApiTypes";

export const userDataActions = {
	pending: createAction<IBaseURLDataRequest>("userData/fetchPending"),
	fulfilled: createAction<IFetchUserDataResponse>("userData/fetchFulfilled"),
	rejected: createAction<any | unknown | Error>("userData/fetchRejected"),
};

export const countriesDataActions = {
	pending: createAction<IBaseURLDataRequest>("countriesData/fetchPending"),
	fulfilled: createAction<ICountryData[]>("countriesData/fetchFulfilled"),
	rejected: createAction<any | unknown | Error>("countriesData/fetchRejected"),
};
