import { createAction } from "@reduxjs/toolkit";

export const userDataActions = {
	fetch: createAction("userData/fetch"),
	pending: createAction("userData/pending"),
	fulfilled: createAction<any>("userData/fulfilled"),
	rejected: createAction<any>("userData/rejected"),

	update: createAction<any>("userData/update"),
	updatePending: createAction("userData/updatePending"),
	updateFulfilled: createAction<any>("userData/updateFulfilled"),
	updateRejected: createAction<any>("userData/updateRejected"),

	changePassword: createAction<{ old_password: string; new_password: string }>("userData/changePassword"),
	changePasswordPending: createAction("userData/changePasswordPending"),
	changePasswordFulfilled: createAction<any>("userData/changePasswordFulfilled"),
	changePasswordRejected: createAction<any>("userData/changePasswordRejected"),

	uploadAvatar: createAction<any>("userData/uploadAvatar"),
	uploadAvatarPending: createAction("userData/uploadAvatarPending"),
	uploadAvatarFulfilled: createAction<any>("userData/uploadAvatarFulfilled"),
	uploadAvatarRejected: createAction<any>("userData/uploadAvatarRejected"),
};
