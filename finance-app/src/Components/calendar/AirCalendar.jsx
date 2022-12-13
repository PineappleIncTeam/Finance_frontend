import AirDatepicker from "air-datepicker";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./AirCalendar.css";
import vect from "./../../Images/calendar.png";

function AirDatePicker(props) {
  let $input = useRef();
  let dp = useRef();
  const [value, setValue] = useState([]);
  console.log(value);
  useEffect(() => {
    dp.current = new AirDatepicker($input.current, {
      ...props,
      multipleDates: true,
      classes: "CLASSGREEN",
      onSelect({ date, formattedDate, datepicker }) {
        if (formattedDate.length == 2) {
          setValue(formattedDate);
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
