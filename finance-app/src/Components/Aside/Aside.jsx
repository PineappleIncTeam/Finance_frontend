import React from "react";
import style from "./Aside.module.css";
import userAva from "./../../Images/userAva.svg";
import "air-datepicker/air-datepicker.css";
import AirDatePicker from "../calendar/AirCalendar";
import { months, month } from "../../urls/urlsAndDates";


const Aside = ({ balanceData, range }) => {
  return (
    <div>
      <div className={style.root}>
        <div className={style.userDate}>
          <div className={style.balance}>
            <input type="text" value={balanceData} readOnly />
            <span className="ruble_icon">₽</span>
            <div className={style.textBalance}>Ваш баланс за <span className={style.balance_month}>{months[month]}</span></div>
          </div>
          <div className={style.userAva}>
            <img src={userAva} alt="" />
          </div>
        </div>
        <div className={style.datePicker}>
          <AirDatePicker range={range} inline={false} autoClose={true} />
        </div>
      </div>
    </div>
  );
};

export default Aside;
