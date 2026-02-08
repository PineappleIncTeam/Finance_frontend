import { call, put, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";

import { reportsStatisticsActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

import { getStatistics } from "../../../api/userProfile/getStatistics";

export function* fetchReportsStatisticsSaga(action: ReturnType<typeof reportsStatisticsActions.pending>) {
	try {
		const response: AxiosResponse<any> = yield call(getStatistics, action.payload.baseURL);

		yield put(reportsStatisticsActions.fulfilled(response.data));
	} catch (error: any) {
		yield put(reportsStatisticsActions.rejected(error.message));
	}
}

export function* watchReportsStatisticsSaga() {
	yield takeLatest(reportsStatisticsActions.pending, fetchReportsStatisticsSaga);
}
