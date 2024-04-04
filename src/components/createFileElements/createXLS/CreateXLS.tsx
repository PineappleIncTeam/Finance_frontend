import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { firstDayOfMonthToPDF, lastDayOfMonthToPDF } from "../../../helpers/urlsAndDates";

import style from "./CreateXLS.module.css";

const CreateXLS = ({ allOperationList, dataCalRange }) => {
	const dataStart = dataCalRange.length > 1 ? dataCalRange[0] : firstDayOfMonthToPDF;
	const dataEnd = dataCalRange.length > 1 ? dataCalRange[1] : lastDayOfMonthToPDF;

	const incomeCash = allOperationList && allOperationList.income_cash;
	const outcomeCash = allOperationList && allOperationList.outcome_cash;
	const moneyBox = allOperationList && allOperationList.money_box;

	return (
		<>
			<ReactHTMLTableToExcel
				id="test-table-xls-button"
				className={style.download_table_xls_button}
				table="table-to-xls"
				filename="tablexls"
				sheet="tablexls"
				buttonText="Сохранить в XLS"
			/>
			<ReactHTMLTableToExcel
				id="test-table-xls-button"
				className={style.download_table_xls_button_mini}
				table="table-to-xls"
				filename="tablexls"
				sheet="tablexls"
				buttonText="XLS"
			/>
			<table id="table-to-xls" className={style.table_xls}>
				<tbody>
					{allOperationList && (
						<tr>
							<th>
								Выписка по операциям Freenance за период c {dataStart} по {dataEnd}
							</th>
						</tr>
					)}
					{incomeCash && incomeCash.length > 0 && (
						<tr>
							<th>Операции с доходами</th>
						</tr>
					)}
					{incomeCash &&
						incomeCash.map((item, index) => {
							return (
								<tr key={index} id={item.id}>
									<th>{item.date}</th>
									<th>{item.categoryName}</th>
									<th>{String(item.sum).replace(/\./, ",")}</th>
								</tr>
							);
						})}

					{outcomeCash && outcomeCash.length > 0 && (
						<tr>
							<th>Операции с расходами</th>
						</tr>
					)}
					{outcomeCash &&
						outcomeCash.map((item, index) => {
							return (
								<tr key={index} id={item.id}>
									<th>{item.date}</th>
									<th>{item.categoryName}</th>
									<th>{String(item.sum).replace(/\./, ",")}</th>
								</tr>
							);
						})}
					{moneyBox && moneyBox.length > 0 && (
						<tr>
							<th>Операции с накоплениями</th>
						</tr>
					)}
					{moneyBox &&
						moneyBox.map((item, index) => {
							return (
								<tr key={index} id={item.id}>
									<th>{item.date}</th>
									<th>{item.categoryName}</th>
									<th>{String(item.sum).replace(/\./, ",")}</th>
								</tr>
							);
						})}

					{/* <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr> */}
				</tbody>
			</table>
		</>
	);
};

export default CreateXLS;
