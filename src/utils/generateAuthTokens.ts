import pkceChallenge from "pkce-challenge";

const stateCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
const stateCharsetLength = 64;
const stateLength = 32;

const generatePkceChallenge = async () => {
	return await pkceChallenge();
};

export const generateCodeChallenge = async () => {
	const challenge = await generatePkceChallenge();
	return challenge.code_challenge;
};

export const generateState = () => {
	let result = "";

	for (let i = 0; i < stateLength; i++) {
		const randomIndex = Math.floor(Math.random() * stateCharsetLength);
		result += stateCharset[randomIndex];
	}

	return result;
};
