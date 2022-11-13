import React from "react";
import style from "./Aside.module.css";
import userAva from "./../../../src/Images/userAva.png";

const Aside = () => {
  return (
    <div>
      <div className={style.root}>
        <div className={style.userDate}>
          <div className={style.balance}>
            <div className={style.textBalance}>Ваш баланс</div>
            <input type="text" />
          </div>
          <div className={style.userAva}>
            <img src={userAva} alt="" />
          </div>
        </div>
      </div>
      <div className={style.calendar}></div>
    </div>
  );
};

export default Aside;
