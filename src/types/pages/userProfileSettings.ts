export interface IPrivateDataFrom {
	nickname: string;
	gender: TGender;
	country: string;
	email: string;
}

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
