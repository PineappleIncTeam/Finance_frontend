export const emailRegex =
	/^\s*(?=.{8,30}$)(?!.*\.{2})(?!.*--)[\w.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)?\.[a-zA-Z]{2,6}\s*$/i;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[^a-zA-Z\d!#/='<>{}@,.$%[\]^&*()~\-:;+?])\S{6,50}$/;
