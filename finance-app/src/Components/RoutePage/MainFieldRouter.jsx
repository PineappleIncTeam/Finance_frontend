import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainField from "../MainField";
import MainFieldAnalitic from "../MainFieldAnalitic";
import MainFieldCosts from "../MainFieldCosts";
import MainFieldStorage from "../MainFieldStorage";

const MainFieldRouter = ({
  getOperationList,
  setSymbol,
  getBalanceData,
  getInputData,
  inputData,
  sumIncomeCash,
  sumOutcomeCash,
  operationList,
  changeRangeCalendar,
  range,
  setCheckMainField,
  months,
  month,
  gistogramSize
}) => {
  return (
    <Routes>
      <Route
        path="/mainfield"
        element={
          <MainField
            getOperationList={getOperationList}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            inputData={inputData}
            sumIncomeCash={sumIncomeCash}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            months={months}
            month={month}
          />
        }
      />
      <Route
        path="/mainfieldcosts"
        element={
          <MainFieldCosts
            getOperationList={getOperationList}
            setSymbol={setSymbol}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            inputData={inputData}
            sumOutcomeCash={sumOutcomeCash}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            months={months}
            month={month}
          />
        }
      />
      <Route path="/mainfieldstorage" element={<MainFieldStorage setCheckMainField={setCheckMainField} />} />
      <Route
        path="/mainfieldanalitic"
        element={
          <MainFieldAnalitic
            operationList={operationList}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            gistogramSize={gistogramSize}
          />
        }
      />
    </Routes>
  );
};

export default MainFieldRouter;
