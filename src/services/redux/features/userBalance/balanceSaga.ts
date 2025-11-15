import { call, put, takeLatest } from "redux-saga/effects";

import { balanceActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

import { getUserBalance } from "../../../api/userProfile/getUserBalance";

import { mockBaseUrl } from "../../../../mocks/envConsts";

import { balanceSlice } from "./BalanceSlice";

export function* fetchBalanceSaga(): Generator<any, void, any> {
	try {
		const response = yield call(getUserBalance, mockBaseUrl);

		yield put(
			balanceSlice.actions.setBalance({
				currentBalance: response.data.currentBalance,
			}),
		);

		yield put(balanceActions.fulfilled());
	} catch (error: any) {
		yield put(balanceActions.rejected(error.message));
	}
}

export function* watchBalanceSaga() {
	yield takeLatest(balanceActions.pending, fetchBalanceSaga);
}
