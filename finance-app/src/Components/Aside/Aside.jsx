import React from "react";
import style from "./Aside.module.css";
import userAva from "./../../../src/Images/userAva.png";
import AirCalendar from "../calendar/AirCalendar";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Aside = () => {
  const [balance, setBalance] = useState("");
  const token = useSelector((state) => state.user.token);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  fetch("http://127.0.0.1:8000/api/balance/", options)
    .then((result) => result.json())
    .then((dataBalans) => console.log(dataBalans));
  return (
    <div>
      <div className={style.root}>
        <div className={style.userDate}>
          <div className={style.balance}>
            <div className={style.textBalance}>Ваш баланс</div>
            <input type="text" value={balance} readOnly />
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
