export interface IChangePassword {
	new_password: string;
	re_new_password: string;
	token: string;
	uid: string;
}

export interface IChangePasswordForm {
	password: string;
	re_password: string;
}

export interface INewPassword {
	email?: string;
}
