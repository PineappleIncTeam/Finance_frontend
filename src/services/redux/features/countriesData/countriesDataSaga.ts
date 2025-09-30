import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { countriesDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { getCountiesData } from "../../../api/userProfile/getCountriesData";
import { ICountryData } from "../../../../types/api/PersonalAccount";

function* fetchCountriesDataSaga(action: ReturnType<typeof countriesDataActions.pending>) {
	try {
		const { payload } = action;

		const countriesData: AxiosResponse<ICountryData[]> = yield call(getCountiesData, {
			baseURL: payload.baseURL,
		});

		yield put(countriesDataActions.fulfilled(countriesData.data));
	} catch (error: unknown) {
		yield put(countriesDataActions.rejected((error as Error).message ?? "Не удалось загрузить список стран"));
	}
}

export function* watchFetchCountriesData() {
	yield takeLatest(countriesDataActions.pending, fetchCountriesDataSaga);
}
