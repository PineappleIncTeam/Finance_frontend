import jsPDF from "jspdf";

import style from "./PdfButton.module.css";
import "../../assets/font/PlayfairDisplay-Medium-normal";

function PdfButton({ reportTemplateRef }: any) {
	const doc = new jsPDF({
		format: "a4",
		unit: "px",
	});
	doc.setFont("PlayfairDisplay-Medium", "normal");

	const handleGeneratePdf = () => {
		doc.html(reportTemplateRef.current, {
			async callback(doc) {
				await doc.save("document");
			},
		});
	};

	return (
		<>
			<button className={style.button} onClick={handleGeneratePdf}>
				Сохранить в PDF
			</button>
			<button className={style.button_mini} onClick={handleGeneratePdf}>
				PDF
			</button>
		</>
	);
}

export default PdfButton;
