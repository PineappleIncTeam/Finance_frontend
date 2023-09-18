// import { useState } from "react";
import AirDatepicker from "air-datepicker";
import React, { useEffect, useRef } from "react";
import "./AirCalendar.css";
import vect from "./../../Images/calendar.png";
import { useDispatch } from "react-redux";

import { setDateCalendar, setDateCalendarRange } from "../../store/dataSlice";

function AirDatePicker(props) {
  const dispatch = useDispatch();

  let $input = useRef();
  let dp = useRef();

  useEffect(() => {
    let button2 = {
      content: "Сегодня",
      className: "custom-button-classname",
      onClick: (dp) => {
        let date = new Date();
        dp.selectDate(date);
        dp.setViewDate(date);
      },
    };

    let button1 = {
      content: "Очистить",
      className: "custom-button-classname",
      onClick: (dp) => {
        dp.$el.value = "";
        dp.selectedDates = [];
        dispatch(
          setDateCalendar({
            data: "",
          })
        );
      },
    };
    dp.current = new AirDatepicker($input.current, {
      ...props,
      buttons: [button2, button1],
      classes: "CLASSGREEN",
      onSelect({ date, formattedDate, datepicker }) {
        if (Array.isArray(formattedDate)) {
          console.log(formattedDate);
          dispatch(
            setDateCalendarRange({
              dataRange: formattedDate,
            })
          );
        } else if (String(formattedDate)) {
          console.log(formattedDate);
          dispatch(
            setDateCalendar({
              data: formattedDate,
            })
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
      <input
        className="input"
        ref={$input}
        placeholder={"Выбор даты"}
        readOnly
      />
      <img src={vect} alt="" className="vect" />
    </div>
  );
}

export default AirDatePicker;
