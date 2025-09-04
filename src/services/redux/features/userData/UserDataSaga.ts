import { call, put, takeLatest } from "redux-saga/effects";

import { getUserData } from "../../../api/auth/getUserData";

import { updateUserData } from "../../../api/auth/updateUserData";

import { userDataActions } from "./UserDataActions";

function* fetchUserDataSaga(): any {
	try {
		yield put(userDataActions.pending());
		const { data } = yield call(getUserData);
		yield put(userDataActions.fulfilled(data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error?.message ?? "Не удалось загрузить данные"));
	}
}

function* updateUserDataSaga(action: ReturnType<typeof userDataActions.update>): any {
	try {
		yield put(userDataActions.pending());
		const { data } = yield call(updateUserData, action.payload);
		yield put(userDataActions.fulfilled(data));
	} catch (error: any) {
		yield put(userDataActions.rejected(error?.message ?? "Не удалось сохранить изменения"));
	}
}

export function* watchUserData() {
	yield takeLatest(userDataActions.fetch, fetchUserDataSaga);
	yield takeLatest(userDataActions.update, updateUserDataSaga);
}
