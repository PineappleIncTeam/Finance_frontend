export interface ISignupFormValues {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export type TSigninFormValues = Omit<ISignupFormValues, "confirmPassword">;

export interface IFormSubmitting {
	setSubmitting: (value: boolean) => void;
}

export type TNewPasswordFormValues = Pick<ISignupFormValues, "password" | "confirmPassword">;
export type TRecoveryPasswordFormValues = Pick<ISignupFormValues, "email">;

export interface InputTypeBase {
	eye: string;
	type: string;
}
