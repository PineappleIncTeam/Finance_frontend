import { call, put, takeLatest } from "redux-saga/effects";

import { userDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

import { getUserEmailData } from "../../../api/userProfile/getUserEmailData";
import { getUserProfileData } from "../../../api/userProfile/getUserProfileData";
import {
	IFetchUserDataResponse,
	IUserEmailDataResponse,
	IUserProfileDataResponse,
} from "../../../../types/api/PersonalAccount";

function* fetchUserDataSaga(action: ReturnType<typeof userDataActions.pending>) {
	try {
		const { payload } = action;

		const userEmailData: IUserEmailDataResponse = yield call(getUserEmailData, { baseURL: payload.baseURL });
		const userProfileData: IUserProfileDataResponse = yield call(getUserProfileData, { baseURL: payload.baseURL });

		const userData: IFetchUserDataResponse = {
			...userProfileData,
			email: userEmailData.email,
		};

		yield put(userDataActions.fulfilled(userData));
	} catch (error: unknown) {
		yield put(userDataActions.rejected((error as Error).message ?? "Не удалось загрузить данные"));
	}
}

export function* watchFetchUserData() {
	yield takeLatest(userDataActions.pending, fetchUserDataSaga);
}
