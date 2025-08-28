import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import { getUserData } from "../../../api/auth/getUserData";
import { updateUserData } from "../../../api/auth/updateUserData";

import { userDataActions } from "./userDataActions";

function* fetchUserDataSaga(): SagaIterator {
	try {
		yield put(userDataActions.pending());
		const response: { data: any } = yield call(getUserData);
		yield put(userDataActions.fulfilled(response.data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error.message));
	}
}

function* updateUserDataSaga(action: ReturnType<typeof userDataActions.update>): SagaIterator {
	try {
		yield put(userDataActions.pending());
		const response: { data: any } = yield call(updateUserData, action.payload);
		yield put(userDataActions.fulfilled(response.data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error.message));
	}
}

export function* watchUserData(): SagaIterator {
	yield takeLatest(userDataActions.pending, fetchUserDataSaga);
	yield takeLatest(userDataActions.update, updateUserDataSaga);
}
