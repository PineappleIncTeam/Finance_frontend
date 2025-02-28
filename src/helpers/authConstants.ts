export const emailPattern =
  /^(?![.\s-])\s*(?=.{8,30}$)(?!.*\.\.)[a-zA-Z0-9_.+-`~½=!#%^|$*{}&’']+@([a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*)+\.[a-zA-Z0-9]+\s*$/i;

export const passwordPattern =
	/^(?=.*\d)(?=.*[a-z])(?!.*(.)\1{2,})(?=.*[A-Z])(?!.*\d{4,}|\d{2}[\\/-]\d{2}[\\/-]\d{4})(?!.*[^a-zA-Z\d!#/\\='"<>{}@,.$%[\]^&*()~_|:;+?^-])[^\s]{6,50}$/;

export const errorDefault = "";
export const errorRequiredField = "Не заполнено обязательное поле.";
export const errorEmailIncorrect = "Не верный формат ввода почты.";
export const errorEmailExist = "Такого адреса не существует.";
export const errorPasswordIncorrect = "Не верный пароль.";
export const errorPasswordRules = "Пароль не соответствует требованиям безопасности.";
export const errorPasswordLength = "Пароль должен содержать не менее 6 знаков.";
export const errorPasswordUppercase = "Пароль должен содержать букву верхнего регистра.";
export const errorPasswordNumber = "Пароль должен содержать хотя бы одну цифру.";
export const errorPasswordRepeat = "Введенный пароль не совпадает.";
export const errorPasswordMoreTwoSameSymbolsRepeat =
	"Пароль не должен содержать более двух одинаковых символов подряд.";
export const errorPasswordThreeNumbersRow = "Пароль не должен содержать более трех цифр подряд.";
export const errorPasswordPrivateBirthDate = "Пароль не должен содержать личную информацию, такую как дата рождения.";
export const errorPasswordStrengthTooWeak =
	"Ваш пароль не соответствует требованиям безопасности. Пожалуйста, используйте минимум 6 символов, включая заглавные буквы, цифры и специальные символы.";
export const errorPasswordStrengthWeak =
	"Ваш пароль считается слабым. Рекомендуем использовать минимум 8 символов и включить специальные символы для повышения его надежности.";
export const errorPasswordStrengthMedium =
	"Ваш пароль считается средним. Для повышения надёжности рекомендуем использовать минимум 15 символов, строчные и заглавные буквы, цифры и включить специальные символы.";
