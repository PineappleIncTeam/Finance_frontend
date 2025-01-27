import React, { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import cn from "classnames";

import { FieldValues, useController } from "react-hook-form";

import moment from "moment";

import { ICustomHeaderInputDate, ICustomInputDate } from "../../types/common/UiKitProps";

import calendarIcon from "../../assets/components/inputDate/calendarIcon";

import style from "./inputDate.module.scss";

import "./datepicker.scss";

const InputDate = <T extends FieldValues>({ isPeriod = false, control, name }: ICustomInputDate<T>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const MAX_YEAR_INTERVAL = 100;
	moment.locale("ru");
	registerLocale("ru", ru);

	const handleChangeCurrentDate = (date: Date | null) => {
		if (date) {
			onChange(date);
		} else {
			onChange(new Date());
		}
	};

	const handleChangeDates = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		onChange([start, end]);
	};

	const CustomHeader = ({
		date,
		changeYear,
		changeMonth,
		decreaseMonth,
		increaseMonth,
		decreaseYear,
		increaseYear,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled,
		prevYearButtonDisabled,
		nextYearButtonDisabled,
	}: ICustomHeaderInputDate) => (
		<div className={style.customHeader}>
			<div className={style.inputDateSelect__arrowButtons}>
				<button
					type="button"
					onClick={decreaseYear}
					disabled={prevYearButtonDisabled}
					className={style.inputDateSelect__arrowButton}>
					<div className={cn(style.inputDateSelect__yearArrow, style.inputDateSelect__arrow__prev)}></div>
				</button>
				<button
					type="button"
					onClick={decreaseMonth}
					disabled={prevMonthButtonDisabled}
					className={style.inputDateSelect__arrowButton}>
					<div className={cn(style.inputDateSelect__monthArrow, style.inputDateSelect__arrow__prev)}></div>
				</button>
			</div>
			<div className={style.inputDateSelectors}>
				<select
					value={date.getMonth()}
					onChange={({ target: { value } }) => changeMonth(Number(value))}
					className={cn(style.inputDateSelect, style.inputDateSelect__month)}>
					{moment.months().map((month, index) => (
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
			<div className={style.inputDateSelect__arrowButtons}>
				<button
					type="button"
					onClick={increaseMonth}
					disabled={nextMonthButtonDisabled}
					className={style.inputDateSelect__arrowButton}>
					<div className={cn(style.inputDateSelect__monthArrow, style.inputDateSelect__arrow__next)}></div>
				</button>
				<button
					type="button"
					onClick={increaseYear}
					disabled={nextYearButtonDisabled}
					className={style.inputDateSelect__arrowButton}>
					<div className={cn(style.inputDateSelect__yearArrow, style.inputDateSelect__arrow__next)}></div>
				</button>
			</div>
		</div>
	);

	return (
		<div className={style.date__wrapper}>
			<p className={style.date__label}>{isPeriod ? "Дата или период" : "Выбор даты"}</p>
			{isPeriod ? (
				<DatePicker
					onChange={handleChangeDates}
					startDate={startDate}
					endDate={endDate}
					selectsRange
					selectedDates={startDate && endDate ? [startDate, endDate] : []}
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
					popperPlacement="bottom-start"
					value={value}
					name={name}
				/>
			) : (
				<DatePicker
					selected={value}
					onChange={handleChangeCurrentDate}
					onMonthChange={handleChangeCurrentDate}
					onYearChange={handleChangeCurrentDate}
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
					popperPlacement="bottom-start"
					name={name}
				/>
			)}
		</div>
	);
};

export default InputDate;
