import { FieldErrors } from "react-hook-form";
import { passwordStrength, defaultOptions } from "check-password-strength";

import {
	errorDefault,
	errorPasswordIncorrect,
	errorEmailIncorrect,
	errorPasswordLength,
	errorPasswordNumber,
	errorRequiredField,
	passwordPattern,
	errorPasswordMoreTwoSameSymbolsRepeat,
	errorPasswordPrivateBirthDate,
	errorPasswordThreeNumbersRow,
	errorPasswordStrengthTooWeak,
	errorPasswordStrengthWeak,
	errorPasswordStrengthMedium,
} from "../helpers/authConstants";

enum ErrorTypes {
	REQUIRED = "required",
	PATTERN = "pattern",
}

defaultOptions.forEach((item) => {
	item.minLength = 6;
});

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
		}
		this.checkPasswordStrength(password, messages);
		this.checkPasswordSameSymbolsThreeNumbersPrivateBirth(password, messages);
		if (password.length >= minPasswordLength && !/(?=.*\d)/.test(password)) {
			messages.push(errorPasswordNumber);
		} else if (!passwordPattern.test(password)) {
			messages.push(errorPasswordIncorrect);
		}
		if (messages.length === 0) {
			return null;
		}
		return messages.join(" ");
	};

	checkPasswordStrength = (password: string, messages: string[]) => {
		if (passwordStrength(password, defaultOptions).value === "Too weak") {
			messages.push(errorPasswordStrengthTooWeak);
		}
		if (passwordStrength(password, defaultOptions).value === "Weak") {
			messages.push(errorPasswordStrengthWeak);
		}
		if (passwordStrength(password, defaultOptions).value === "Medium") {
			messages.push(errorPasswordStrengthMedium);
		}
		return messages.join(" ");
	};

	checkPasswordSameSymbolsThreeNumbersPrivateBirth = (password: string, messages: string[]) => {
		const passArray = password.split("");
		for (let i = 0; i < password.length; i++) {
			if (passArray[i] === passArray[i + 1]) {
				messages.push(errorPasswordMoreTwoSameSymbolsRepeat);
			}
			if (+passArray[i + 1] - +passArray[i] == 1 && +passArray[i + 2] - +passArray[i + 1] == 1) {
				messages.push(errorPasswordThreeNumbersRow);
			}
			if (
				!isNaN(
					Date.parse(
						passArray[i] +
							passArray[i + 1] +
							"-" +
							passArray[i + 2] +
							passArray[i + 3] +
							"-" +
							passArray[i + 4] +
							passArray[i + 5] +
							passArray[i + 6] +
							passArray[i + 7],
					),
				) ||
				!isNaN(
					Date.parse(
						passArray[i] +
							passArray[i + 1] +
							passArray[i + 2] +
							passArray[i + 3] +
							"-" +
							passArray[i + 4] +
							passArray[i + 5] +
							"-" +
							passArray[i + 6] +
							passArray[i + 7],
					),
				)
			) {
				messages.push(errorPasswordPrivateBirthDate);
			}
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
