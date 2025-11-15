// import { call, put, takeLatest } from "redux-saga/effects";

// import { AxiosResponse } from "axios";

// import { balanceActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

// import { getUserBalance } from "../../../api/userProfile/getUserBalance";

// import { mockBaseUrl } from "../../../../mocks/envConsts";

// import { balanceSlice } from "./BalanceSlice";

// interface IGetBalanceResponse {
// 	current_balance: number;
// 	error_message?: string;
// 	error_code?: number;
// }

// export function* fetchBalanceSaga(
// 	action: ReturnType<typeof balanceActions.pending>,
// ): Generator<any, void, any> {
// 	try {
// 		const response: AxiosResponse<IGetBalanceResponse> = yield call(getUserBalance, mockBaseUrl);

// 		yield put(
// 			balanceSlice.actions.setBalance({
// 				currentBalance: response.data.current_balance,
// 			}),
// 		);

// 		yield put(balanceActions.fulfilled());
// 	} catch (error: any) {
// 		yield put(balanceActions.rejected(error.message));
// 	}
// }

export function* watchBalanceSaga() {
	// yield takeLatest(balanceActions.pending, fetchBalanceSaga);
}
