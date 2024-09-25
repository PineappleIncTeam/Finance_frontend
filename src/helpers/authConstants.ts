export const emailPattern = /^\s*(?=.{8,30}$)(?!.*\.\.)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\s*$/i;
export const passwordPattern =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[^a-zA-Z\d!#/='<>{}@,.$%[\]^&*()~:;+?^-])[^\s]{6,50}$/;

export const errorDefault = "";
export const errorRequiredField = "Не заполнено обязательное поле";
export const errorEmailIncorrect = "Не верный формат ввода почты";
export const errorEmailExist = "Такого адреса не существует";
export const errorPasswordIncorrect = "Не верный пароль";
export const errorPasswordRules = "Пароль не соответствует требованиям безопасности";
export const errorPasswordLength = "Пароль должен содержать не менее 6 знаков";
export const errorPasswordNumber = "Пароль должен содержать хотя бы одну цифру";
export const errorPasswordRepeat = "Введенный пароль не совпадает";
