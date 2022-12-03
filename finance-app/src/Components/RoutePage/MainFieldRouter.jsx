import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainField from "../MainField";
import MainFieldAnalitic from "../MainFieldAnalitic";
import MainFieldCosts from "../MainFieldCosts";
import MainFieldStorage from "../MainFieldStorage";

const MainFieldRouter = ({ getOperationList, setSymbol }) => {
  return (
    <Routes>
      <Route path="/mainfield" element={<MainField getOperationList={getOperationList} />} />
      <Route path="/mainfieldcosts" element={<MainFieldCosts getOperationList={getOperationList} setSymbol={setSymbol}/>} />
      <Route path="/mainfieldstorage" element={<MainFieldStorage />} />
      <Route path="/mainfieldanalitic" element={<MainFieldAnalitic />} />
    </Routes>
  );
};

export default MainFieldRouter;
