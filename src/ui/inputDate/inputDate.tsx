import React, { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import cn from "classnames";

import { ICustomHeaderInputDate } from "../../types/common/UiKitProps";

import { calendarIcon } from "../../assets/components/InputDate/calendar";
import { months } from "../../helpers/months";

import style from "./inputDate.module.scss";

import "./datepicker.scss";

registerLocale("ru", ru);

const InputDate = () => {
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date>(currentDate);
	const MAX_YEAR_INTERVAL = 100;

	const handleChange = (date: Date | null) => {
		if (date) {
			setStartDate(date);
		}
	};

	const CustomHeader = ({
		date,
		changeYear,
		changeMonth,
		decreaseMonth,
		increaseMonth,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled,
	}: ICustomHeaderInputDate) => (
		<div className={style.customHeader}>
			<button
				type="button"
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
				className={cn(style.inputDateSelect__arrow, style.inputDateSelect__arrow__prev)}></button>
			<div>
				<select
					value={date.getMonth()}
					onChange={({ target: { value } }) => changeMonth(Number(value))}
					className={style.inputDateSelect}>
					{months.map((month, index) => (
						<option key={index} value={index}>
							{month}
						</option>
					))}
				</select>
				<select
					value={date.getFullYear()}
					onChange={({ target: { value } }) => changeYear(Number(value))}
					className={style.inputDateSelect}>
					{[...Array(MAX_YEAR_INTERVAL)].map((_, index) => (
						<option key={index} value={date.getFullYear() - MAX_YEAR_INTERVAL / 2 + index}>
							{date.getFullYear() - MAX_YEAR_INTERVAL / 2 + index}
						</option>
					))}
				</select>
			</div>
			<button
				type="button"
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
				className={cn(style.inputDateSelect__arrow, style.inputDateSelect__arrow__next)}></button>
		</div>
	);

	return (
		<div className={style.date__wrapper}>
			<p className={style.date__label}>{"Выбор даты"}</p>
			<DatePicker
				selected={startDate}
				onChange={handleChange}
				onYearChange={handleChange}
				onMonthChange={handleChange}
				locale={"ru"}
				placeholderText="__.__.___"
				dateFormat="dd.MM.yy"
				showIcon
				calendarIconClassName={style.calendarIcon}
				icon={calendarIcon(style.calendarIcon__img)}
				className={style.date}
				readOnly={false}
				todayButton="Сегодня"
				renderCustomHeader={CustomHeader}
				closeOnScroll={true}
			/>
		</div>
	);
};

export default InputDate;
