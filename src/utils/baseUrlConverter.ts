export function getCorrectBaseUrl() {
	const envDomainName = window.location.hostname.split(".")[0];
	return `https://${envDomainName}.freenance.store`;
}
