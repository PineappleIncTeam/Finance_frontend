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
          />
        }
      />
      <Route path="/mainfieldstorage" element={<MainFieldStorage />} />
      <Route
        path="/mainfieldanalitic"
        element={<MainFieldAnalitic operationList={operationList} />}
      />
    </Routes>
  );
};

export default MainFieldRouter;
