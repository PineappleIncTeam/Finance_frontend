export interface ISignupUserData {
	email: string;
	username: string;
	password: string;
}

export interface ChangingUserPassword {
	uid: string | (string | null)[] | null;
	token: string;
	new_password: string;
	re_new_password: string;
}

export type TLoginData = Omit<ISignupUserData, "email">;

export type TRecoveryData = Pick<ISignupUserData, "email">;
