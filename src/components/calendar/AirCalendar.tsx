import AirDatepicker from "air-datepicker";
import { useEffect, useRef } from "react";

import useAppDispatch from "../../hooks/useAppDispatch";

import "./AirCalendar.css";

import { setDateCalendar, setDateCalendarRange } from "../../services/redux/features/infoPart/InfoPartSlice";

import vect from "./../../assets/calendar.png";

function AirDatePicker(props: any) {
	const $input = useRef();
	const dp = useRef();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const button2 = {
			content: "Сегодня",
			className: "custom-button-classname",
			onClick: (dp) => {
				const date = new Date();
				dp.selectDate(date);
				dp.setViewDate(date);
			},
		};

		const button1 = {
			content: "Очистить",
			className: "custom-button-classname",
			onClick: (dp) => {
				dp.$el.value = "";
				dp.selectedDates = [];
				dispatch(
					setDateCalendar({
						data: "",
					}),
				);
			},
		};
		dp.current = new AirDatepicker($input.current, {
			...props,
			buttons: [button2, button1],
			classes: "CLASSGREEN",
			onSelect({ formattedDate }) {
				if (Array.isArray(formattedDate)) {
					dispatch(
						setDateCalendarRange({
							dataRange: formattedDate,
						}),
					);
				} else if (String(formattedDate)) {
					dispatch(
						setDateCalendar({
							data: formattedDate,
						}),
					);
				}
			},
		});
	}, []);

	useEffect(() => {
		dp.current.update({ ...props });
	}, [props]);

	return (
		<div className="rootInput">
			<input className="input" ref={$input} placeholder={"Выбор даты"} readOnly />
			<img src={vect} alt="" className="vect" />
		</div>
	);
}

export default AirDatePicker;
