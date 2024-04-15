import { User } from "../types/components/ComponentsTypes";

export const constantExample = 18;
export const constantExample1 = 21;

export const constantObjectExample = {
	property1: 0,
	property2: 0,
};

export function processUserData(user: User): boolean {
	let isValid = true;

	if (user.age < constantExample) {
		if (user.parentalConsent) {
			if (user.country === "USA") {
				const consentAge = getConsentAgeByCountry(user.country);
				if (user.age < consentAge) {
					isValid = false;
				}
			} else {
				isValid = false;
			}
		} else {
			isValid = false;
		}
	} else if (user.country === "USA") {
		const legalAge = getLegalAgeByCountry(user.country);
		if (user.age < legalAge) {
			isValid = false;
		}
	}

	return isValid;
}

function getConsentAgeByCountry(country: string): number {
	if (!country) {
		return 0;
	}
	return constantExample;
}

function getLegalAgeByCountry(country: string): number {
	if (!country) {
		return 0;
	}
	return constantExample1;
}
