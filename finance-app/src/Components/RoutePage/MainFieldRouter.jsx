import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainField from "../MainField";
import MainFieldAnalitic from "../MainFieldAnalitic";
import MainFieldCosts from "../MainFieldCosts";
import MainFieldStorage from "../MainFieldStorage";

const MainFieldRouter = ({ getOperationList, setSymbol, getBalanceData }) => {
  return (
    <Routes>
      <Route path="/mainfield" element={<MainField getOperationList={getOperationList} getBalanceData={getBalanceData} />} />
      <Route path="/mainfieldcosts" element={<MainFieldCosts getOperationList={getOperationList} setSymbol={setSymbol} getBalanceData={getBalanceData} />} />
      <Route path="/mainfieldstorage" element={<MainFieldStorage />} />
      <Route path="/mainfieldanalitic" element={<MainFieldAnalitic />} />
    </Routes>
  );
};

export default MainFieldRouter;
