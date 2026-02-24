import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { reportCategoriesActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { ICommonErrorResponse } from "../../../../types/common/ApiTypes";
import { getReportsCategories } from "../../../api/userProfile/getReportsCategories";
import { IReportsCategoriesResponse } from "../../../../types/api/Analytics";

export function* fetchReportCategoriesSaga(action: ReturnType<typeof reportCategoriesActions.pending>) {
	try {
		const { payload } = action;

		const reportCategoriesData: AxiosResponse<IReportsCategoriesResponse> = yield call(getReportsCategories, {
			baseURL: payload.baseURL,
		});

		yield put(
			reportCategoriesActions.fulfilled({
				incomes: reportCategoriesData.data.incomes,
				outcomes: reportCategoriesData.data.outcomes,
				targets: reportCategoriesData.data.targets,
			}),
		);
	} catch (error: unknown) {
		yield put(
			reportCategoriesActions.rejected(
				error instanceof Error ? error.message : (error as ICommonErrorResponse).error_message,
			),
		);
	}
}

export function* watchReportCategoriesSaga() {
	yield takeLatest(reportCategoriesActions.pending, fetchReportCategoriesSaga);
}
