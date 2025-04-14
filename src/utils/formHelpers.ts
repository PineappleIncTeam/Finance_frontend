import { FieldErrors } from "react-hook-form";

import { passwordStrength } from "check-password-strength";

import { defaultOptions } from "../helpers/passwordStrengthOption";

import {
	errorDefault,
	errorPasswordIncorrect,
	errorEmailIncorrect,
	errorRequiredField,
	passwordPattern,
	errorPasswordMoreTwoSameSymbolsRepeat,
	errorPasswordPrivateBirthDate,
	errorPasswordThreeNumbersRow,
	errorPasswordStrengthTooWeak,
	errorPasswordStrengthWeak,
	errorPasswordStrengthMedium,
	errorPasswordNumber,
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
		if (password.length >= minPasswordLength && !/(?=.*\d)/.test(password)) {
			messages.push(errorPasswordNumber);
		}
		this.checkPasswordStrength(password, messages);
		if (
			password.match(/\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/g) ||
			password.match(/\d{2}(-|\/|\.)\d{2}(-|\/|\.)\d{4}/g) ||
			password.match(/\d{8}/g)
		) {
			messages.push(errorPasswordPrivateBirthDate);
		}
		if (password.match(/\d{3,}/g)) {
			messages.push(errorPasswordThreeNumbersRow);
		}
		if (password.match(/(.)\1/)) {
			messages.push(errorPasswordMoreTwoSameSymbolsRepeat);
		}
		if (!passwordPattern.test(password)) {
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

	getAddCategoryError = (errors: FieldErrors) => {
		if (errors) {
			return "Не верные данные";
		}
	};
}

export const formHelpers = new FormHelpers();
