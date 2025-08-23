import { call, put, takeLatest } from "redux-saga/effects";

import { getUserData, updateUserData } from "../../../../services/api/auth/userApi";

import { userDataActions } from "./userDataActions";

function* fetchUserDataSaga() {
	try {
		yield put(userDataActions.pending());
		const response = yield call(getUserData);
		yield put(userDataActions.fulfilled(response.data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error.message));
	}
}

function* updateUserDataSaga(action: ReturnType<typeof userDataActions.update>) {
	try {
		yield put(userDataActions.pending());
		const response = yield call(updateUserData, action.payload);
		yield put(userDataActions.fulfilled(response.data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error.message));
	}
}

export function* watchUserData() {
	yield takeLatest(userDataActions.pending, fetchUserDataSaga);
	yield takeLatest(userDataActions.update, updateUserDataSaga);
}
