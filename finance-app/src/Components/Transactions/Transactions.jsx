import React from "react";
import style from "./Transactions.module.css";

const Transactions = () => {
  return (
    <div className={style.root}>
      <div className={style.text}>Последние операции</div>

      <hr />
    </div>
  );
};

export default Transactions;
