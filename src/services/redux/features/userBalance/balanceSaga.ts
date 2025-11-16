import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IGetBalanceResponse } from "../../../../types/api/PersonalAccount";
import { ICommonErrorResponse } from "../../../../types/common/ApiTypes";
import { balanceActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { getUserBalance } from "../../../api/userProfile/getUserBalance";

export function* fetchBalanceSaga(action: ReturnType<typeof balanceActions.pending>) {
	try {
		const { payload } = action;

		const userBalanceData: AxiosResponse<IGetBalanceResponse> = yield call(getUserBalance, {
			baseURL: payload.baseURL,
		});

		yield put(balanceActions.fulfilled(userBalanceData.data.current_balance));
	} catch (error: unknown) {
		yield put(
			balanceActions.rejected(error instanceof Error ? error.message : (error as ICommonErrorResponse).error_message),
		);
	}
}

export function* watchBalanceSaga() {
	yield takeLatest(balanceActions.pending, fetchBalanceSaga);
}
