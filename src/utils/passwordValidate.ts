import { errorPasswordLength, errorPasswordNumber, passwordPattern, errorPasswordUppercase } from "../helpers/authConstants";

export const passwordValidate = (value: string) => {
  const minPasswordLength = 6;
  if (value.length < minPasswordLength) {
    return errorPasswordLength;
  } else if (value.length >= minPasswordLength && !/(?=.*\d)/.test(value)) {
    return errorPasswordNumber;
  } else if (!passwordPattern.test(value)) {
    return errorPasswordUppercase;
  }
};