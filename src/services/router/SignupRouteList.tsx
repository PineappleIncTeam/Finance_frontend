import { Routes, Route, Navigate } from "react-router-dom";

import Rectangle from "../../components1/Rectangle";
import AuthReg from "../../components1/registration-page/auth/AuthReg";
import NewPass from "../../components1/registration-page/recoveryPage/NewPass";
import RecoveryPass from "../../components1/registration-page/recoveryPage/RecoveryPass";
import RegistPage from "../../components1/registration-page/registPage/RegistPage";

const IntroRouteList = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthReg />} />
			<Route path="/login" element={<RegistPage />} />
			<Route path="/rectangle/" element={<Navigate to="/rectangle/mainfield" />} />
			<Route path="/rectangle/*" element={<Rectangle />} />
			<Route path="/recovery" element={<RecoveryPass />} />
			<Route path="/password/reset/confirm/" element={<NewPass />} />
		</Routes>
	);
};

export default IntroRouteList;
