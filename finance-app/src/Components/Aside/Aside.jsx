import React from "react";
import style from "./Aside.module.css";
import userAva from "./../../../src/Images/userAva.png";
import AirCalendar from "../calendar/AirCalendar";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

const Aside = ({ balanceData }) => {

  return (
    <div>
      <div className={style.root}>
        <div className={style.userDate}>
          <div className={style.balance}>
            <div className={style.textBalance}>Ваш баланс</div>
            <input type="text" value={balanceData} readOnly />
          </div>
          <div className={style.userAva}>
            <img src={userAva} alt="" />
          </div>
        </div>
      </div>
      <AirCalendar />
    </div>
  );
};

export default Aside;
