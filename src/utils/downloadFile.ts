export function downloadFile(base64Data: string, fileName: string) {
	if (typeof base64Data !== "string" || !base64Data.startsWith("data:")) {
		throw new Error("Invalid file format. Expected base64 data URI.");
	}

	const link = document.createElement("a");
	link.href = base64Data;
	link.download = fileName;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
