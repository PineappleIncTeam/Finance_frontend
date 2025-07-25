import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import cn from "classnames";
import { FieldValues, useController } from "react-hook-form";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { ICustomHeaderInputDate, ICustomInputDate } from "../../types/common/UiKitProps";
import InputDateSelector from "../../components/userProfileLayout/inputDateSelector/inputDateSelector";
import { InputTypeList } from "../../helpers/Input";

import calendarIcon from "../../assets/components/inputDate/calendarIcon";

import styles from "./inputDate.module.scss";
import "./datepicker.scss";

const InputDate = <T extends FieldValues>({ isPeriod = false, control, name, isLabel = true }: ICustomInputDate<T>) => {
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
		<div className={styles.customHeader}>
			<div className={styles.inputDateSelect__arrowButtons}>
				<button
					type={InputTypeList.Button}
					onClick={decreaseYear}
					disabled={prevYearButtonDisabled}
					className={styles.inputDateSelect__arrowButton}>
					<div className={cn(styles.inputDateSelect__yearArrow, styles.inputDateSelect__arrow__prev)}></div>
				</button>
				<button
					type={InputTypeList.Button}
					onClick={decreaseMonth}
					disabled={prevMonthButtonDisabled}
					className={styles.inputDateSelect__arrowButton}>
					<div className={cn(styles.inputDateSelect__monthArrow, styles.inputDateSelect__arrow__prev)}></div>
				</button>
			</div>
			<div className={styles.inputDateSelectors}>
				<InputDateSelector options={moment.months()} changeDate={changeMonth} value={date.getMonth()} isMonth />
				<InputDateSelector
					options={Array.from(
						{ length: MAX_YEAR_INTERVAL },
						(_, index) => date.getFullYear() - MAX_YEAR_INTERVAL / 2 + index,
					)}
					changeDate={changeYear}
					value={date.getFullYear()}
				/>
			</div>
			<div className={styles.inputDateSelect__arrowButtons}>
				<button
					type={InputTypeList.Button}
					onClick={increaseMonth}
					disabled={nextMonthButtonDisabled}
					className={styles.inputDateSelect__arrowButton}>
					<div className={cn(styles.inputDateSelect__monthArrow, styles.inputDateSelect__arrow__next)}></div>
				</button>
				<button
					type={InputTypeList.Button}
					onClick={increaseYear}
					disabled={nextYearButtonDisabled}
					className={styles.inputDateSelect__arrowButton}>
					<div className={cn(styles.inputDateSelect__yearArrow, styles.inputDateSelect__arrow__next)}></div>
				</button>
			</div>
		</div>
	);

	function renderCorrectDatePicker() {
		return isPeriod ? (
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
				calendarIconClassName={styles.calendarIcon}
				icon={calendarIcon(styles.calendarIcon__img)}
				className={styles.date}
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
				calendarIconClassName={styles.calendarIcon}
				icon={calendarIcon(styles.calendarIcon__img)}
				className={styles.date}
				readOnly={false}
				todayButton="Сегодня"
				renderCustomHeader={CustomHeader}
				closeOnScroll={true}
				popperPlacement="bottom-start"
				name={name}
			/>
		);
	}

	return (
		<div className={styles.date__wrapper}>
			{isLabel && <p className={styles.date__label}>{isPeriod ? "Дата или период" : "Выбор даты"}</p>}
			{renderCorrectDatePicker()}
		</div>
	);
};

export default InputDate;
