import { FieldErrors } from "react-hook-form";

import {
	errorDefault,
	errorEmailIncorrect,
	errorPasswordLength,
	errorPasswordNumber,
	errorPasswordRules,
	errorRequiredField,
	passwordPattern,
} from "../helpers/authConstants";

enum ErrorTypes {
	REQUIRED = "required",
	PATTERN = "pattern",
}

class FormHelpers {
	getPasswordError = (errors: FieldErrors, password: string) => {
		const errorInfo = errors.password || {};

		switch (errorInfo.type) {
			case ErrorTypes.REQUIRED:
				return errorRequiredField;
			case ErrorTypes.PATTERN:
				return this.constructPasswordMessage(password);
			default:
				return errorDefault;
		}
	};

	constructPasswordMessage = (password: string) => {
		const messages = [];
		const minPasswordLength = 6;
		if (password.length < minPasswordLength) {
			messages.push(errorPasswordLength);
		} else if (password.length > minPasswordLength && !/(?=.*\d)/.test(password)) {
			messages.push(errorPasswordNumber);
		} else if (!passwordPattern.test(password)) {
			messages.push(errorPasswordRules);
		}
		if (messages.length === 0) {
			return null;
		}
		return messages.join(" ");
	};

	getEmailError = (errors: FieldErrors) => {
		switch (errors.email?.type) {
			case ErrorTypes.REQUIRED:
				return errorRequiredField;
			case ErrorTypes.PATTERN:
				return errorEmailIncorrect;
			default:
				return errorDefault;
		}
	};
}

export const formHelpers = new FormHelpers();
