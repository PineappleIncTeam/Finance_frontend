import AirDatepicker from "air-datepicker";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./AirCalendar.css";
import vect from "./../../Images/calendar.png";
import { useDispatch } from "react-redux";

import { setDateCalendar } from "../../store/dataSlice";

function AirDatePicker(props) {
  const dispatch = useDispatch();

  let $input = useRef();
  let dp = useRef();

  useEffect(() => {
    let button1 = {
      content: "Очистить",
      className: "custom-button-classname",
      onClick: (dp) => {
        dp.$el.value = "";
        dp.selectedDates = [];
        console.log(dp.selectedDates);
        dispatch(
          setDateCalendar({
            data: "",
          })
        );
      },
    };
    dp.current = new AirDatepicker($input.current, {
      ...props,
      buttons: ["today", button1],
      classes: "CLASSGREEN",
      onSelect({ date, formattedDate, datepicker }) {
        dispatch(
          setDateCalendar({
            data: formattedDate,
          })
        );
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
