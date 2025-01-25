import React, { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";

import { calendarIcon } from "../../assets/components/InputDate/calendar";

import style from "./inputDate.module.scss";
import "./datepicker.scss";

registerLocale("ru", ru);

const InputDate = () => {
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date>(currentDate);

	const handleChange = (date: Date | null) => {
		if (date) {
			setStartDate(date);
		}
	};

	return (
		<div className={style.date__wrapper}>
			<p className={style.date__label}>{"Выбор даты"}</p>
			<DatePicker
				selected={startDate}
				onChange={handleChange}
				locale={"ru"}
				placeholderText="__.__.___"
				dateFormat="dd.MM.yy"
				showIcon
				calendarIconClassName={style.calendarIcon}
				icon={calendarIcon(style.calendarIcon__img)}
				className={style.date}
				readOnly={false}
				todayButton="Сегодня"
			/>
		</div>
	);
};

export default InputDate;
