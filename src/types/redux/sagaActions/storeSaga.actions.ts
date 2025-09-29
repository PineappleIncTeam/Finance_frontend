import { createAction } from "@reduxjs/toolkit";

import { IFetchUserDataResponse, IGettingUserDataRequest } from "../../api/PersonalAccount";

export const userDataActions = {
	pending: createAction<IGettingUserDataRequest>("userData/fetchPending"),
	fulfilled: createAction<IFetchUserDataResponse>("userData/fetchFulfilled"),
	rejected: createAction<any | unknown | Error>("userData/fetchRejected"),
};
