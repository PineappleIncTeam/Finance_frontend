import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Rectangle from "../Rectangle";
import AuthReg from "../registration-page/auth/AuthReg";
import RegistPage from "../registration-page/registPage/RegistPage";
import RecoveryPass from "../registration-page/recoveryPage/RecoveryPass";
import NewPass from "../registration-page/recoveryPage/NewPass";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthReg />} />
      <Route path="/login" element={<RegistPage />} />
      <Route
        path="/rectangle/"
        element={<Navigate to="/rectangle/mainfield" />}
      />
      <Route path="/rectangle/*" element={<Rectangle />} />
      <Route path="/recovery" element={<RecoveryPass />} />
      <Route path="/password/reset/confirm/" element={<NewPass />} />
    </Routes>
  );
};

export default RoutePage;
