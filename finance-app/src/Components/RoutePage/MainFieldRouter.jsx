import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainField from "../MainField";
import MainFieldAnalitic from "../MainFieldAnalitic";
import MainFieldCosts from "../MainFieldCosts";
import MainFieldStorage from "../MainFieldStorage";

const MainFieldRouter = () => {
  return (
    <Routes>
      <Route path="/mainfield" element={<MainField />} />
      <Route path="/mainfieldcosts" element={<MainFieldCosts />} />
      <Route path="/mainfieldstorage" element={<MainFieldStorage />} />
      <Route path="/mainfieldanalitic" element={<MainFieldAnalitic />} />
    </Routes>
  );
};

export default MainFieldRouter;
