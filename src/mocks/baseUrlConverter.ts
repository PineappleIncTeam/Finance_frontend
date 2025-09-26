export function getCorrectBaseUrl() {
	if (window.location.hostname === "localhost") {
		return "https://dev.freenance.store";
	}

	const envDomainName = window.location.hostname.split(".")[0];
	return `https://${envDomainName}.freenance.store`;
}
