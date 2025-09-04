export interface IPrivateDataFrom {
	nickname: string;
	gender: string;
	country: string;
	email: string;
	avatar: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TGender = "male" | "female";

export interface IChangePasswordForm {
	oldPassword: string;
	newPassword: string;
	repeatPassword: string;
}

export interface IUserAvatar {
	personalAvatar?: string;
	templateAvatar: string;
}

export interface IPrivateAppSettings {
	currency: string;
	darkTheme: boolean;
	finAssistant: boolean;
}
