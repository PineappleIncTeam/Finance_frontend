import { call, put, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";

import { reportsStatisticsActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { getReportsStatistics } from "../../../api/userProfile/getReportsStatistics";
import { IReportsStatistics } from "../../../../types/api/Analytics";
import { ICommonErrorResponse } from "../../../../types/common/ApiTypes";

export function* fetchReportsStatisticsSaga(action: ReturnType<typeof reportsStatisticsActions.pending>) {
	try {
		const response: AxiosResponse<IReportsStatistics> = yield call(getReportsStatistics, action.payload.baseURL);

		yield put(reportsStatisticsActions.fulfilled(response.data));
	} catch (error: unknown) {
		yield put(
			reportsStatisticsActions.rejected(
				error instanceof Error ? error.message : (error as ICommonErrorResponse).error_message,
			),
		);
	}
}

export function* watchReportsStatisticsSaga() {
	yield takeLatest(reportsStatisticsActions.pending, fetchReportsStatisticsSaga);
}
