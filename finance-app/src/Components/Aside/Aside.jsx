import React from "react";
import style from "./Aside.module.css";
import userAva from "./../../../src/Images/userAva.png";
import "air-datepicker/air-datepicker.css";
import AirDatePicker from "../calendar/AirCalendar";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

const Aside = ({ balanceData, range }) => {
  return (
    <div>
      <div className={style.root}>
        <div className={style.userDate}>
          <div className={style.balance}>
            <input type="text" value={balanceData} readOnly />
            <span className="ruble_icon">₽</span>
            <div className={style.textBalance}>Ваш баланс</div>
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
