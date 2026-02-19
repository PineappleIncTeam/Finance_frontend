export function downloadFile(data: string | Blob, fileName: string) {
	let href: string;

	if (data instanceof Blob) {
		href = URL.createObjectURL(data);
	} else if (typeof data === "string") {
		let finalData = data;

		if (!finalData.startsWith("data:")) {
			if (fileName.endsWith(".pdf")) {
				finalData = `data:application/pdf;base64,${finalData}`;
			} else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
				finalData = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${finalData}`;
			} else {
				finalData = `data:application/octet-stream;base64,${finalData}`;
			}
		}
		href = finalData;
	} else {
		throw new Error(`Invalid file format. Expected string or Blob, got: ${typeof data}`);
	}

	const link = document.createElement("a");
	link.href = href;
	link.download = fileName;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	if (data instanceof Blob) {
		URL.revokeObjectURL(href);
	}
}
