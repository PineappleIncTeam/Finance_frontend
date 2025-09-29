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

		console.log(userEmailData);

		const userData: IFetchUserDataResponse = {
			// ...userProfileData,
			nickname: userProfileData.nickname ? userProfileData.nickname : "",
			gender: userProfileData.gender ? userProfileData.gender : "M",
			country: 1, // need to fix
			// eslint-disable-next-line camelcase
			country_name: userProfileData.country_name ? userProfileData.country_name : "",
			avatar: userProfileData.avatar ? userProfileData.avatar : "",
			defaultAvatar: userProfileData.defaultAvatar ? userProfileData.defaultAvatar : 0,

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
