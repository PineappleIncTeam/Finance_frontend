import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

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

		const userEmailData: AxiosResponse<IUserEmailDataResponse> = yield call(getUserEmailData, { baseURL: payload.baseURL });
		const userProfileData: AxiosResponse<IUserProfileDataResponse> = yield call(getUserProfileData, { baseURL: payload.baseURL });

		const userData: IFetchUserDataResponse = {
			// ...userProfileData,
			nickname: userProfileData.data.nickname ? userProfileData.data.nickname : "",
			gender: userProfileData.data.gender ? userProfileData.data.gender : "M",
			country: 1, // need to fix
			// eslint-disable-next-line camelcase
			country_name: userProfileData.data.country_name ? userProfileData.data.country_name : "",
			avatar: userProfileData.data.avatar ? userProfileData.data.avatar : "",
			defaultAvatar: userProfileData.data.defaultAvatar ? userProfileData.data.defaultAvatar : 0,

			email: userEmailData.data.email,
		};

		yield put(userDataActions.fulfilled(userData));
	} catch (error: unknown) {
		yield put(userDataActions.rejected((error as Error).message ?? "Не удалось загрузить данные"));
	}
}

export function* watchFetchUserData() {
	yield takeLatest(userDataActions.pending, fetchUserDataSaga);
}
