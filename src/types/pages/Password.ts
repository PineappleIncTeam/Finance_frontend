export interface IChangePassword {
	uid?: string;
	token?: string;
	new_password: string;
	re_new_password: string;
}

export interface INewPassword {
	email: string;
}
