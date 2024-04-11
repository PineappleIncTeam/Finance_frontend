import AirDatePicker from "../calendar/AirCalendar";
import { balanceMonths } from "../../helpers/urlsAndDates";
import { numberFormatRub } from "../../helpers/calculator";

import userAva from "./../../assets/userAva.svg";

import "air-datepicker/air-datepicker.css";

import style from "./DateBar.module.css";

const DateBar = ({ balanceData, range, selectDate, checkCalculator }: any) => {
	const selectDateAside = selectDate.split("-");
	return (
		<div>
			<div className={style.root}>
				<div className={style.userDate}>
					<div className={style.balance}>
						<input type="text" value={numberFormatRub.format(balanceData)} readOnly />
						<div className={style.textBalance}>
							Ваш баланс на <span className={style.balance_month}>{selectDateAside[2]}</span>
							<span className={style.balance_month}>{balanceMonths[Number(selectDateAside[1])]}</span>
						</div>
					</div>
					<div className={style.userAva}>
						<img src={userAva} alt="" />
					</div>
				</div>
				{!checkCalculator && (
					<div className={style.datePicker}>
						<AirDatePicker range={range} inline={false} autoClose={true} />
					</div>
				)}
			</div>
		</div>
	);
};

export default DateBar;
