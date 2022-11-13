import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rectangle from "../Rectangle";
import AuthReg from "../registration-page/auth/AuthReg";
import RegistPage from "../registration-page/registPage/RegistPage";

const RoutePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthReg />} />
        <Route path="/login" element={<RegistPage />} />
        <Route path="/rectangle" element={<Rectangle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePage;
